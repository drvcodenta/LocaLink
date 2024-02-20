import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";


async function Page() {
    const user = await currentUser();
    const userInfo = {};
    const userData = {
        id: user?.id as string,
        ObjectId: userInfo?._id as string,
        name: userInfo?.name as string|| user?.firstName || "",
        userName: userInfo?.userName as string|| user?.username as string,
        bio: userInfo?.bio as string|| "",
        image: userInfo?.image as string|| user?.imageUrl || "",
    }
    return(
        <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
            <h1 className='head-text'>Onboarding Page</h1>
            <p className='mt-3 text-base-regular text-light-2'>
                Complete your profile now to use Threads
            </p>

            <section className="mt-9 bg-dark-2 p-10">
                <AccountProfile 
                user={userData} 
                btnTitle="Continue"
            />
            </section>
        </main>
    )
}


export default Page;