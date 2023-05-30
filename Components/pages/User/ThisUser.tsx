"use client";
import useUserData from '@/app/hooks/useUserData';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC } from 'react'

interface IThisUserProps {
    children?: React.ReactNode | React.ReactNode[],
    userData: any;
    child: any;
}

const ThisUser: FC<IThisUserProps> = ({ userData, child }: IThisUserProps) => {
    const isActive = (href: any) => usePathname() == href;

    console.log('render',userData);
    return (
        <div className='ThisUser component w-full h-full grow flex flex-col overflow-hidden'>
            <div className="r r1  back h-[160px] border shrink-0 bg-gray-400 ">

            </div>
            <div className="r r2 relative h-[50%] pl-5 flex flex-col  grow   ">

                <div className="r r2 shrink-0 flex h-[7vh]">
                    <div className="image-static-container relative w-24 h-24">
                        <img src={userData.avatar}
                            alt="" className='w-full  absolute -top-[50%] rounded-full z-10' />
                    </div>
                    <div className="w-full flex pt-3 justify-end">
                        <button className='btn-alternative rounded-3xl '>edit profile</button>
                    </div>
                </div>
                <div className="r r3 shrink-0 ">
                    <div className="r r1 shrink-0 font-bold text-2xl">
                        {userData.displayName}
                    </div>
                    <div className="r r2 shrink-0 text-gray-500">
                        @{userData.name}
                    </div>
                </div>
                <div className="r r4 shrink-0 flex gap-3 mt-3">
                    <div className="c c1">
                        {userData.followingCount}
                        <span className='text-gray-600'> Following</span>
                    </div>
                    <div className="c c2">
                        {userData.followersCount}
                        <span className='text-gray-600'> Followers</span>

                    </div>
                </div>
                <div className="r r5 shrink-0 tweets-nav flex justify-between">
                    <div className="c c1 px-3 py-1  border-b-2 border-gray-600 cursor-pointer">
                        <Link href={`/user/${userData.id}/user-tweets`}
                            className={`${isActive(`/user/${userData.id}/user-tweets`) ? 'active' : ''}`}>

                            Tweets</Link>
                    </div>
                    <div className="c c2 px-3 py-1  border-b-2 border-gray-600 cursor-pointer">Replies</div>
                    <div className="c c3 px-3 py-1  border-b-2 border-gray-600 cursor-pointer">Media</div>
                    <div className="c c4 px-3 py-1  border-b-2 border-gray-600 cursor-pointer">
                        <Link
                            className={`${isActive(`/user/${userData.id}/user-likes`) ? 'active' : ''}`}
                            href={`/user/${userData.id}/user-likes`}>Likes</Link>

                    </div>
                </div>
                <div className="r r6 h-[50%] grow flex">
                    {child}
                </div>

            </div>
        </div>

    )
}
export default ThisUser;