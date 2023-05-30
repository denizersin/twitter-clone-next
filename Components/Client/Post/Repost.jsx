import React from 'react'
import Post from './Post'
import { AiOutlineRetweet } from 'react-icons/ai'
export default function Repost({ postData }) {
    return (
        <div className={'Repost component w-full h-full flex flex-col'}>
            <div className="r r1 flex items-center gap-2">
                <AiOutlineRetweet />   {postData.owner.displayName} retweeted
            </div>
            <div className="r r2">
                <Post postData={postData.repost.repostedPost} />
            </div>
        </div>
    )
}
