import Image from "next/image";
import Link from "next/link";
import heart_grey from "/assets/heart-gray.svg"
import reply from "/assets/reply.svg"
import share from "/assets/share.svg"
import repost from "/assets/repost.svg"
import Comment from "../forms/Comment";


interface Props{
    id: string,
    currentUserId: string,
    parentId: string | null,
    content: string,
    author: {
        name: string,
        image: string,
        id: string,
    }
    community: {
        id: string,
        name: string,
        image: string,
    } | null,
    createAt: string,
    comments: {
        author: {
            image: string,
        }
    }[],
    isComment?: boolean,
}

const ThreadCard = ({
        id,
        currentUserId,
        parentId,
        content,
        author,
        community,
        createAt,
        comments,
        isComment,
}: Props) => {

    return (
        <div>
        <article className={`flex w-full flex-col rounded-xl ${isComment? 'xs:px-7 px-3 mb-5' : 'bg-dark-2 p-7'}`}>
            <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
                            <Image 
                            src={author.image}
                            alt="Profile_image"
                            fill
                            className="cursor-pointer rounded-full"></Image>
                        </Link>

                        <div className="thread-card_bar" />
                    </div>

                    <div className="flex w-full flex-col">
                    <Link href={`/profile/${author.id}`} className="w-fit">
                        <h4 className="cursor-pointer text-base-semibold text-light-1">
                        {author.name}
                        </h4>
                    </Link>

                    <p className="text-small-regular text-light-2">
                        {content}
                    </p>

                    <div className="mt-5 flex flex-col gap-3">
                        <div className="flex gap-3.5">
                            <Image src={heart_grey} alt="heart" width={24} height={24} className="cursor-pointer object-contain" />

                            <Link href={`/thread/${id}`}>
                            <Image src={reply} alt="reply" width={24} height={24} className="cursor-pointer object-contain" />
                            </Link>

                            <Image src={repost} alt="repost" width={24} height={24} className="cursor-pointer object-contain" />
                 
                            <Image src={share} alt="share" width={24} height={24} className="cursor-pointer object-contain" />
                            </div>


                            {isComment && comments.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className="mt-1 text-subtle-medium text-gray-1">{comments.length} repl{comments.length > 1 ? "ies" : "y"}</p>
                                </Link>
                            )}

                    </div>
                    </div>
                </div>

            </div>

        </article>
        </div>
        
    )

}

export default ThreadCard;