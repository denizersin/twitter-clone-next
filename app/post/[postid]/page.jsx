import TweetDisplay from './components/TweetDisplay';
import backend from '@/backend/db';
import prisma from '@/lib/prisma'
import { getUserToken } from '@/lib/utils'
import React from 'react'

export default async function page(props) {
    console.log(props)

    const user = await getUserToken();
    const postid = parseInt(props.params.postid);
    const postData = await backend.getPostById(postid, user?.id)
    // const initiLCommentPosts = await backend.getComments(postid);
    // console.log(initiLCommentPosts[0].post.commentPost,'qwe')
    return (
        <div className={'page component w-full max-w-[600px]'}> 
        <TweetDisplay postData={postData} showComment={true} />
        </div>
    )
}
