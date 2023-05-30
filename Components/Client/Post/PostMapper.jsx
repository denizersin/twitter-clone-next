"use client";
import React from 'react'
import NormalPost from './NormalPost'
import Comment from './Comment'
import Repost from './Repost'
export default function PostMapper({postData,d}) {
    console.log(d)
    const components = {
        'normal': NormalPost,
        'repost': Repost,
        "comment": Comment
    }
    console.log(postData)
    const PostComponent = components[postData.type]
    return (
        <PostComponent postData={postData} />
    )
}
