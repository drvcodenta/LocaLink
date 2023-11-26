'use server'

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { ConnectToDB } from "../mongoose";


interface Params{
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}
export async function createThread({
text,author,communityId,path
}: Params) {

    try {
        ConnectToDB();
    
        const createThread = await Thread.create({
            text,
            author,
            commmunity: null,
        }); //This produces the Thread
    
        //Update User Model
    
        await User.findByIdAndUpdate(author, {
            $push: { threads: createThread._id} //This pushed the thread to User
        })
    
        revalidatePath(path);
    } catch (error:any) {
        throw new Error(`Error Creating Thread: ${error.message}`);
    }
}


// The pageNumber variable is the current page number, and the pageSize variable is the number of documents to display on each page

export async function fetchPost(pageNumber=1, pageSize=1){
    ConnectToDB();

    const skipAmount = (pageNumber - 1) * pageSize; 

    //This snnipet fetched the post that have no parent id
    // The postQuery variable you provided is a MongoDB query that will find all threads with no parent (parentId: {$in: [null, undefined]}), sorted by createdAt in descending order (sort: { createdAt: 'desc' })
    const postsQuery = Thread.find({ parentId: {$in: [null, undefined]}})
    .sort({ createdAt: 'desc'})
    .skip(skipAmount) //This can be useful for implementing pagination
    .limit(1)  //The .limit() method in MongoDB allows you to limit the number of documents that are returned by a query
    .populate({ path: 'author',model: User}) //The .populate() method in MongoDB allows you to populate the fields of a document with the data from other documents in other collections
    .populate({
        path: 'children',
        populate: {
            path: 'author',
            model: User,
            select: "_id name parentId image"
        }
    })

    const totalPostCount = await Thread.count({
        parentId : {$in : [null, undefined]}
    })

    const posts = await postsQuery.exec(); //is used to execute the postsQuery query and assign the results to the posts variable

    const isNext = totalPostCount > skipAmount + posts.length;

    return {isNext , posts}

}


export async function fetchThreadById(id: string){
    ConnectToDB();


    // TODO: Populate Community
    try {
        const thread = await Thread.findById(id)
        .populate({
            path: 'author',
            model: User,
            select: "_id id name image"
        })
        .populate({
            path: 'children',
            populate: [
                {
                    path: 'author',
                    model: User,
                    select: "_id id name parentId image"
                },
                {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: "_id id name parentId image  "
                    }
                }
            ]
        }).exec();

        return thread;
    } catch (error: any) {error
        throw new Error(`Error fetching thread: ${error.message}`)
    }
}