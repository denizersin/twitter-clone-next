import useUserData from '@/app/hooks/useUserData'

import React from 'react'
import { useQueryClient } from '@tanstack/react-query';
import Actions from './Actions';
import Post from './Post';
export default function NormalPost({ postData }) {

    const { data: userData } = useUserData({});



    return (
        <Post postData={postData} />
    )
}
