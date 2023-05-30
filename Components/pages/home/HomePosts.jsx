import useInfinitePosts from '@/app/hooks/useInfinitePosts';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react'
import PostContainer from './PostContainer';

export default function HomePosts(props) {

    const queryClient = useQueryClient();
    const inifinteQuery = useInfinitePosts({
        initialData: props.initialUserPosts,
        queryKey: ['posts', 'infinite'],
        getDataByLastTime: async (lastTime) => fetch(`http://localhost:3000/api/post?&time=${lastTime}`, {
            method: "GET",
        }).then(res => res.json())
    })
    const { data } = inifinteQuery;
    let postsData = [];
    if (data?.pages)
        postsData = data?.pages.flat();// merge pages
    else if (props.initialUserPosts) {
        postsData = props.initialUserPosts;
    }




    return (
        <div className={'HomePosts component h-full overflow-hidden'}> 
            <PostContainer inifinteQuery={inifinteQuery} postsData={postsData} />
        </div>
    )
}
