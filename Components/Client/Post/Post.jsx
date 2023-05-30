import React from 'react'
import Actions from './Actions'
import { useRouter } from 'next/navigation';

export default function Post({ postData }) {
    const route = useRouter();
    const content = postData?.commentPost?.content || postData?.normalPost?.content;

    const onCLickPost = (e) => {

        route.push(`/post/${postData.id}`);

    }
    return (
        <div
            className={'Post component min-h-[100px] max-h-[300px] overflow-hidden flex border-b border-b-gray-300 my-1 py-1  hover:bg-slate-200/70 cursor-pointer'} >
            <div className="c c1 min-w-[60px]  flex">
                <img src={postData.owner.avatar || "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png"} alt="" className='w-[50px] h-[50px] rounded-full' />
            </div>
            <div className="c c2 flex flex-col grow">
                <div className="r r1 ">
                    <span className='font-bold'>{postData.owner.displayName}</span>
                    <span className='text-gray-600'>@{postData.owner.name}</span>
                </div>
                <div className="r r2 min-h-[70px]"
                    onClick={onCLickPost}>
                    <p>
                        {content}
                    </p>
                </div>
                <div className="r r3 w-full">
                    <Actions postData={postData} />
                </div>
            </div>

        </div>
    )
}
