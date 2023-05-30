import React, { Suspense } from 'react'
import Tweets from './components/Tweets'
import Likes from './components/Likes'
import backend from '@/backend/db'
import { getUserToken } from '@/lib/utils'
import PageContainer from '@/Components/PageContainer'
export default async function page({ params }) {

    const map = {
        'user-tweets': Tweets,
        'user-likes': Likes,
    }
    const userData = await getUserToken();
    const initDataMap = {
        'user-tweets': () => backend.getUserPosts(userData.id),
        'user-likes': () => backend.getUserLikePosts(userData.id),
    }
    const initialData = await initDataMap[params.tweetsType]();

    const Component = map[params.tweetsType]
    return (
        <PageContainer>
            <Component initialPostsData={initialData} />
        </PageContainer>
    )

}

