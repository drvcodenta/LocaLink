'use client'
import { Form } from "@/components/ui/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { UserValidation } from "@/lib/validations/user";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/ui/form"
import { Input } from "@/components/ui/ui/input"
import * as z from 'zod';
import { Button } from "../ui/ui/button";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "@/ /ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from '@/lib/uploadthing'
import { UpdateUser } from "@/lib/actions/user.actions";
import { usePathname,useRouter } from "next/navigation";

interface Props{
    user: {
        id: string;
        ObjectId: string;
        userName: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}


const AccountProfile = ({ user , btnTitle }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [files, setFiles] = useState<File[]>([])
  const { startUpload } = useUploadThing("media");
    const form = useForm<z.infer<typeof UserValidation>>({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            name: user?.name || '',
            profile_photo: user?.image|| '',
            bio: user?.bio || '',
            userName: user?.userName || '',
        }
    })

    const onSubmit = async(values: z.infer<typeof UserValidation>) => {
      const blob = values.profile_photo;

      const hasImageChanged = isBase64Image(blob);
      if(hasImageChanged){
        const imgRes = await startUpload(files)

        if(imgRes && imgRes[0].url){
          values.profile_photo = imgRes[0].url;
        }
      }

      await UpdateUser({
        name: values.name,
        path: pathname,
        userName: values.userName,
        userId: user.id,
        bio: values.bio,
        image: values.profile_photo,
      });

      if(pathname === '/profile/edit'){
        router.back();
      } else {
        router.push("/");
      }
      };



    const handleImage = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
      e.preventDefault();
      const fileReader = new FileReader();
      if(e.target.files && e.target.files.length > 0){
        const file = e.target.files[0];
        setFiles(Array.from(e.target.files));

        if(!file.type.includes('image')) return;

        fileReader.onload = async (event) => {
          const imageDataUrl = event.target?.result?.toString() || "";
          fieldChange(imageDataUrl);
        }

        fileReader.readAsDataURL(file);
      }
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">
            <FormField
              control={form.control}
              name="profile_photo"
              render={({ field }) => (
                <FormItem className="flex items-centre gap-4">
                  <FormLabel className="account-form_image-label">
                    <Image
                    src={field.value}
                    alt="profile_icon"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                    >
                    </Image>
                  </FormLabel>
                  <FormControl className="flex-1 text-base-semibold text-gray-200">
                    <Input 
                    type="file"
                    accept="image/*"
                    placeholder="Add_Profile_Photo"
                    className="account-form_image-input"
                    onChange={(e) => handleImage(e,field.onChange)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2">
                    Name
                  </FormLabel>
                  <FormControl className="flex-1 text-base-semibold text-gray-200">
                    <Input 
                    type="text"
                    className="account-form_input no-focus"
                    {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='userName'
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-3">
                  <FormLabel className="text-base-semibold text-light-2">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input 
                    type="text"
                    className="account-form_input no-focus"
                    {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="flex flex-col items-centre gap-4">
                  <FormLabel className="text-base-semibold text-light-2">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea
                    rows={10}
                    className="account-form_input no-focus"
                    {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-primary-500">
              {btnTitle}
              </Button>
          </form>
        </Form>
      )}

export default AccountProfile;