import OtherUser from '@/Components/pages/User/OtherUser';
import ThisUser from '@/Components/pages/User/ThisUser';
import backend from '@/backend/db';
import { getUserToken } from '@/lib/utils';
import React, { FC } from 'react'

export default async function layout({ children, tweets, params }) {
    let userData = await getUserToken();
    const userId = parseInt(params.userid);
    const isThisUser = userData && userData.id === userId;
    if (!isThisUser) userData = await backend.getUserData(userId);
    return (
        <>
            <div className="tweets-container flex w-[630px] shrink-0  h-full max-sm:shrink ">
                {
                    isThisUser ?
                        <ThisUser userData={userData} child={children} /> : <OtherUser userData={userData} child={children} />
                }
            </div>
            <div className="c2 w-[650px] max-sm:hidden"></div>

        </>
    )
}
