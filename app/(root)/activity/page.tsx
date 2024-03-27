import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {

  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(user.id);
  // ...
  if (!userInfo?.onboarded) redirect('/onboarding'); // Use the 'redirect' function
    return (
      <div className="head-text">Activity Page</div>
      //get activity
      
    )
  }
  
  export default Page;