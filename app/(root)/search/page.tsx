
import UserCard from "@/components/cards/UserCard";
import ProfileHeader from "@/components/forms/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadTab";
import { profileTabs } from "@/constants";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

async function Page() {

  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(user.id);
  // ...
  if (!userInfo?.onboarded) redirect('/onboarding'); // Use the 'redirect' function
  //fetch Users
  const result = await fetchUsers({
    userId: user.id,
    searchString: '',
    pagenumber: 1,
    pagesize: 25,
  });
  return (
    <section>
    <h1 className="head-text mb-10">Search Page</h1>
    {/*We need a Damn Search Bar Here*/}
    <div className="mt-14 flex flex-col gap-9">
      {result.users.length === 0? (
        <p className="no-result">No users</p>
      ): (
        <>
        {result.users.map((person)=>(
          <UserCard
          key={person.id}
          id={person.id}
          name={person.name}
          username={person.username}
          imgUrl={person.image}
          personType='User'
          />
        ))}
        </>
      )}
    </div>
    </section>
  )
}

export default Page