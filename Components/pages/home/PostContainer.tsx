"use client";
import React, { FC, useEffect, useRef, useState } from 'react'
import '@/app/globals.css'
import { useQueryClient } from '@tanstack/react-query';
import useInfinitePosts from "@/app/hooks/useInfinitePosts";
import CreatePost from './CreatePost';
import PostMapper from '@/Components/Client/Post/PostMapper';
interface IPostContainerProps {
    children?: React.ReactNode | React.ReactNode[];
    userData: any;
    postsData: any;
    inifinteQuery: any;
}

const PostContainer: FC<IPostContainerProps> = ({
    userData,
    postsData,
    inifinteQuery
}: IPostContainerProps) => {
    const { data, status, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
        inifinteQuery;



    const scrollRef = useRef(null);
    useEffect(() => {
        if (scrollRef.current) {
            const elem: HTMLDivElement = scrollRef.current as HTMLDivElement;
            elem.addEventListener('scroll', () => {
                if (status !== "loading" && !isFetchingNextPage &&
                    Math.abs(elem.scrollTop - (elem.scrollHeight - elem.clientHeight)) <= 10) {
                    fetchNextPage();
                }
            })
        }
    }, [scrollRef.current])


    console.log(data, status, isLoading,hasNextPage);

    return (
        <div
            ref={scrollRef}
            className='PostContainer component overflow-y-scroll  h-full'>
            <div className="r r1 flex flex-col">
                {
                    postsData && (
                        postsData.map((post: any) => (
                            <PostMapper key={post.id} postData={post} />
                        ))
                    )

                }
                {isFetchingNextPage &&
                    (
                        <div className='h-[100px]  bg-red-500'>fetchin next tweets...</div>
                    )
                }
            </div>


        </div>
    )
}
export default PostContainer;