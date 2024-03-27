'use server'

import { FilterQuery, SortOrder } from 'mongoose';
import Thread from '../models/thread.model';
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

export async function fetchUserPosts(userId: string){
    try{
        ConnectToDB()
        const threads = await User.findOne({id: userId}).populate({
            path: 'threads',
            model: Thread,
            populate: {
                path: 'children',
                model: Thread,
                populate: {
                    path: 'author',
                    model: User,
                    select: 'name image id'
                }
            }
        }
        )
        return threads;
    }catch(error: any){
        throw new Error(`Failed to fetch the post in the tabs section: ${error}`)
    }
}

export async function fetchUsers({
    userId,
    pagenumber = 1,
    searchString = "",
    pagesize = 20,
    sortBy = "desc"
}: {
    userId: string,
    pagenumber?: number,
    searchString?: string,
    pagesize?: number,
    sortBy?: SortOrder,
}){
    try{
        ConnectToDB();
        const skipAmount = (pagenumber - 1) * pagesize;
        const regex = new RegExp(searchString, "i");
        const query: FilterQuery<typeof User>={
            id: {$ne: userId}
        }
        if(searchString.trim() !== ''){
            query.$or = [
                {username: {$regex: regex}},
                {name: {$regex: regex}},
            ]
        }
        const sortOptions = {createdAt: sortBy};
        const usersQuery = User.find(query).sort(sortOptions).skip(skipAmount).limit(pagesize);
        const totalUsersCount = await User.countDocuments(query);
        const users = await usersQuery.exec();
        const isNext = totalUsersCount > skipAmount + users.length;
        return {users, isNext};
    }catch(error: any){
        throw new Error(`Failed to fetch users: ${error.message}`)
    }
}

export async function getActivity(userId: string){
    try{
        ConnectToDB();
        //find all threads created by user
        const usertheads = await Thread.find({author: userId});
        //collect all child thread ids(replies) from the children field
    }catch(error: any){
        throw new Error("cannot connect to db and fetch activity page");
    }
}