'use server'

import User from '../models/user.model';
import { ConnectToDB } from "../mongoose"
import { revalidatePath } from "next/cache";

interface Params{
    userId: string,
    userName: string,
    name: string,
    bio: string,
    image: string,
    path: string,
}

export async function UpdateUser({
    userId,
    userName,
    name,
    bio,
    image,
    path,
}: Params): Promise<void> {
    try{ 
        ConnectToDB();

        await User.findOneAndUpdate(
        {id: userId},
        {userName: userName.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,},
        { upsert: true}
        );

        if (path==='/profile/edit'){
            revalidatePath(path);
        }
    }catch(error:any){
        throw new Error(`Failed to create/Update User: ${error.message}`);
    }
}

export async function fetchUser(userId: string){
    try {
        ConnectToDB();
        return await User.findOne({id: userId})
    } catch (error: any) {
        throw new Error(`Failed to fetch User: ${error.message}`);
    }
}