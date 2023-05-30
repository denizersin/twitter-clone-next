"use client";
import PostContainer from '@/Components/pages/home/PostContainer';
import useInfinitePosts from '@/app/hooks/useInfinitePosts';
import React from 'react'

export default  function Likes({initialPostsData}) {
    const inifinteQuery = useInfinitePosts({
        initialData: initialPostsData,
        queryKey: ['posts', 'infinite', 'user-likes'],
        getDataByLastTime: async (lastTime) => fetch(`http://localhost:3000/api/post?&time=${lastTime}&type=user-likes`, {
            method: "GET",
        }).then(res => res.json())
    })
    const { data } = inifinteQuery;
    let postsData = [];
    if (data?.pages)
        postsData = data?.pages.flat();// merge pages
    else if (initialPostsData) {
        postsData = initialPostsData;
    }




    return (
        <div className={'component h-full overflow-hidden'}> 
            <PostContainer  inifinteQuery={inifinteQuery} postsData={postsData} />
        </div>
    )
}
