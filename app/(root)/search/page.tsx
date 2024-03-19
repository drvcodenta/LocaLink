import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/_/ui/tabs"
import ProfileHeader from "@/components/forms/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadTab";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

async function Page({params}:{params: {id: string}}) {

    const user = await currentUser();
    if(!user) return null;

        const userInfo = await fetchUser(params.id);
        // ...
        if (!userInfo?.onboarded) redirect('/onboarding'); // Use the 'redirect' function

  return (
    <div className="head-text">Search Page</div>
  )
}

export default Page