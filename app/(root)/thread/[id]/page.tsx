import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


const Page = async ({ params } : { params : { id : string}}) => {
    if(!params.id) return null;

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding');

    const thread = await fetchThreadById(params.id)
    // console.log(JSON.stringify(userInfo._id));

    return(
    <div className="relative">
        <div>
        <ThreadCard
            key = {thread._id}
            id = {thread._id}
            currentUserId = {user?.id || ""}
            parentId = {thread.parentId}
            content = {thread.text}
            author = {thread.author}
            community = {thread.community}
            createAt = {thread.createdAt}
            comments = {thread.children}
        />
        </div>

        <div className="mt-7">
            <Comment 
            threadId={params.id}
            currentUserId={JSON.stringify(userInfo._id)}
            currentUserImg={user.imageUrl}
            />
        </div>
        
        <div className="mt-7">
            {thread.children.map((childItem: any) => (<ThreadCard
            key = {childItem._id}
            id = {childItem._id}
            currentUserId = {childItem.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createAt={childItem.createAt}
            comments={childItem.children}
            isComment
            />))}
        </div>
    </div>)
}

export default Page;