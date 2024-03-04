import Image from "next/image";

interface props{
    accountId: string,
    authUserId: string,
    name: string,
    userName: string,
    imgUrl: string,
    bio: string
}

const ProfileHeader = ({accountId,authUserId,name,userName,imgUrl,bio}: props) => {
    return(
        <div className="flex flex-col w-full justify-start">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 object-cover">
                        <Image
                        src={imgUrl}
                        alt="profile_photo"
                        fill
                        className="rounded-full object-cover shadow-2xl" />
                    </div>
                    <div className="text-left text-white">
                        <h2 className="text-white text-heading2-bold">{name}</h2>
                        <p className="text-base-medium text-gray-1">@{userName}</p>
                    </div>
                </div>
            </div>
            <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
            <div className="mt-12 h-0.5 w-full bg-dark-3"/>
        </div>
    )
}

export default ProfileHeader;