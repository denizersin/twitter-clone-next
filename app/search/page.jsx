import PageContainer from '@/Components/PageContainer';
import { getUserToken } from '@/lib/utils';
import SearchClient from '@/Components/pages/search/SearchClient';
import React, { FC } from 'react'


const page = async ({ }) => {

    const userData=await getUserToken();
    return (
        <PageContainer>
            <SearchClient userData={userData}></SearchClient>
        </PageContainer>
    )
}
export default page;