import React from 'react'
import { AiOutlineHeart, AiOutlineRetweet, AiTwotoneHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import useActionMutate from '@/app/hooks/useActionMutate'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUserData from '@/app/hooks/useUserData';

export default function Actions({ postData, onSuccessMutation,handleClickComment }) {
    const queryClient = useQueryClient();
    const { data: userData } = useUserData({});
    const onSuccess = (result) => {
        if (result.succsess) {
            queryClient.invalidateQueries({
                queryKey: ['posts', 'infinite'],
            });
        }
        else {
            console.log('error', result)
        }
    };
    const { mutate, isLoading } = useActionMutate({
        onSuccess: onSuccessMutation || onSuccess
    })
    const { mutate: mutateRepost, loading: isLoadingRepost } = useMutation({
        mutationFn: async (data) => {
            const response = await fetch('http://localhost:3000/api/post/create', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            const result = await response.json();
            return result;
        },
        onSuccess: (result) => {
            queryClient.invalidateQueries({
                queryKey: ['posts', 'infinite'],
            });
        }
    })
    const onClcikRepost = () => {
        if (isLoadingRepost) return
        mutateRepost({
            repostedPostId: postData.id,
            ownerId: userData.id,
            type: 'repost'
        })
    }
    const onClickLike = () => {
        if (isLoading) return
        if (postData.isLiked)
            mutate({ id: postData.id, action: 'unlike' })
        else mutate({ id: postData.id, action: 'like' })
    }
    console.log(postData)
    return (
        <div className={'Actions component w-full h-full flex justify-between'}>
            <div className="c c1 flex items-center gap-1 " onClick={onClickLike}>
                {
                    postData.isLiked ? <AiTwotoneHeart className='cursor-pointer' size={19} color='red' /> : <AiOutlineHeart size={19} className='cursor-pointer hover:text-red-500' />
                }
                <span>{postData.likeCount}</span>
            </div>
            <div className="c c2 flex items-center gap-1" onClick={onClcikRepost}>
                {
                    postData.isReposted ? <AiOutlineRetweet className='cursor-pointer' size={19} color="green" /> : <AiOutlineRetweet size={19} className='hover:text-green-700 cursor-pointer' />
                }
                <span>{postData.repostCount}</span>

            </div>
            <div className="c c3 flex items-center gap-1">
                <FaRegComment className='cursor-pointer hover:text-green-700' size={19} 
                onClick={handleClickComment}
                />
                <span>{postData.commentCount}</span>
            </div>
            <div className="c c4"></div>
            <div className="c c5"></div>
        </div>
    )
}
