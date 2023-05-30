"use client";
import React, { FC, useEffect } from 'react'
import PageContainer from '@/Components/PageContainer';
import HomePosts from './HomePosts';
import CreatePost from './CreatePost';
interface IHomeProps {
    children?: React.ReactNode | React.ReactNode[];
    userData: any;
    initialUserPosts: any;
}

const Home: FC<IHomeProps> = ({ userData, initialUserPosts }: IHomeProps) => {


    return (
        <PageContainer>
            <div className='flex h-full'>
                <div className="tweets-container flex flex-col w-[630px] grow h-full">
                    <CreatePost />
                    <HomePosts {...{ userData, initialUserPosts }} />
                </div>
                <div className="c2 w-[500px] max-lg:hidden"></div>
            </div>
        </PageContainer>
    )
}
export default Home;


