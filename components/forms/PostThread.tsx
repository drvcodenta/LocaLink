'use client'


import * as z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/ui/form"
import { Button } from "../ui/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/_/ui/textarea";
import { usePathname,useRouter } from "next/navigation";



// import { UpdateUser } from "@/lib/actions/user.actions";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from '@/lib/actions/thread.actions';


interface Props{
  userId: string;
}

function PostThread({userId}: {userId : string}){

  const router = useRouter();
  const pathname = usePathname();


    const form = useForm<z.infer<typeof ThreadValidation>>({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: "",
            accountId: userId,
        }
    })

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
      await createThread({
        text: values.thread,
        author: userId,
        communityId: null,
        path: pathname,
      });

      router.push("/");
    }

    return (
        <Form {...form}>
          <form 
          className="flex flex-col justify-start gap-10"
          onSubmit={form.handleSubmit(onSubmit)} >

          <FormField
              control={form.control}
              name="thread"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="mt-10 text-base-semibold text-light-2">
                    Content
                  </FormLabel>
                  <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                    <Textarea
                    rows={15}
                    {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='bg-primary-500'>
                Post Thread
            </Button>
            </form>
        </Form>
    )
}

export default PostThread;