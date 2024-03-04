
import ProfileHeader from "@/components/forms/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page({params}:{params: {id: string}}) {

    const user = await currentUser();
    if(!user) return null;

        const userInfo = await fetchUser(params.id);

        if(!userInfo?.onboarded) redirect('/onboarding');
    return(
            <section>
                <ProfileHeader
                accountId={userInfo.userId}
                authUserId={user.id}
                name={userInfo.name} // Add 'name' property to 'User' type
                userName={userInfo.userName}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
                />
            </section>
        )
}

export default Page;