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
import { Input } from "@/components/ui/ui/input";
import { usePathname,useRouter } from "next/navigation";



// import { UpdateUser } from "@/lib/actions/user.actions";
import { CommentValidation } from "@/lib/validations/thread";
import Image from 'next/image';
import { addCommentToThread } from '@/lib/actions/thread.actions';
// import { createThread } from '@/lib/actions/thread.actions';


interface Props{
    threadId: string;
    currentUserId: string;
    currentUserImg: string;
}

function Comment({threadId, currentUserId, currentUserImg}: Props){
    
  const router = useRouter();
  const pathname = usePathname();


    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
      await addCommentToThread(threadId, values.thread, currentUserId, pathname);
      form.reset();
    }
    return (
        <Form {...form}>
          <form 
          className="comment-form"
          onSubmit={form.handleSubmit(onSubmit)} >

          <FormField
              control={form.control}
              name="thread"
              render={({ field }) => (
                <FormItem className="flex  w-full items-center gap-3">
                  <FormLabel>
                    <Image 
                    src={currentUserImg}
                    alt="Profile Image"
                    height={48}
                    width={48}
                    className='rounded-full object-cover'/>
                  </FormLabel>
                  <FormControl className="border-none bg-transparent">
                    <Input
                    placeholder='comment-section'
                    className='no-focus text-light-1 outline-none'
                    {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='comment-form_btn'>
                reply
            </Button>
            </form>
        </Form>
    )
}

export default Comment;