"use client";
import Actions from '@/Components/Client/Post/Actions';
import useCreatePostM from '@/app/hooks/useCreatePostM';
import useUserData from '@/app/hooks/useUserData';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'

export default function TweetDisplay({ postData, showComment }) {

    const { data: userData } = useUserData({});
    const [isShowComments, setIsShowComments] = useState(false);
    const [replyText, setReplyText] = useState('');
    const { data: commentsData, isFetching } = useQuery({
        queryKey: ['post', 'comments', postData.id],
        initialData: null,
        queryFn: async () => {
            const result = await fetch(`http://localhost:3000/api/post/comments?&postId=${postData.id}`).then(res => res.json())
            if (result.succsess) {
                return result.data;
            }
        }
    })
    useEffect(() => {
        if (showComment)
            onClickShowComments();
    }, []);
    const queryClient = useQueryClient();

    const onClickShowComments = (e) => {
        if (!isShowComments && !commentsData) {
            queryClient.refetchQueries(['post', 'comments', postData.id])
        }
        setIsShowComments(!isShowComments)
    }
    const { mutate } = useCreatePostM({
        mutationKey: ['post', 'reply'],
        onSuccess: (data) => {
            if (data.succsess) {

                queryClient.invalidateQueries(['post', 'comments', postData.id])

            }

        }
    })
    console.log(postData)
    const handleReply = async (e) => {
        if (!replyText) return;
        if (postData.type == 'comment') {
            mutate({
                ownerId: userData.id,
                content: replyText,
                type: 'comment-comment',
                commentedPostId: postData.id,
                mainPostId: postData.commentPost.mainPostId
            })
        }
        else {
            mutate({
                ownerId: userData.id,
                content: replyText,
                type: 'comment-post',
                commentedPostId: postData.id,
                mainPostId: postData.id
            });

        }
    }
    const onSuccessMutation = (data) => {
        if (data.succsess) {
            queryClient.invalidateQueries(['post', 'comments', postData.commentPost.commentedPostId])

        }
    }
    const content = postData.normalPost?.content || postData.repost?.content || postData.commentPost?.content
    console.log(commentsData)

    return (
        <div className={'TweetDisplay component flex min-h-[100px] border'}>
            <div
                onClick={onClickShowComments}
                className="c1 w-[60px] flex-col items-center flex justify-center cursor-pointer">
                <img src={postData.owner.avatar || 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png'} alt=""
                    className='w-[50px] h-[50px] rounded-full '
                />
                <div

                    className="line-container h-full grow w-[20%] flex flex-col justify-center items-center cursor-pointer hover:bg-gray-400/60 rounded-xl">
                    <div className="line w-[1px] h-full bg-black"></div>
                </div>
            </div>
            <div className="c2 w-full flex flex-col ">
                <div className="r1">
                    {content}
                </div>
                <div className="r">
                    <Actions postData={postData} onSuccessMutation={onSuccessMutation} handleClickComment={onClickShowComments} />
                </div>
                {isShowComments && <div className="r2 flex">
                    <input type="text"
                        className='border'
                        placeholder='reply'
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)} />
                    <button onClick={handleReply} className='btn-alternative rounded-3xl bg-blue-500 text-white hover:text-black'>reply</button>
                </div>}
                <div className="r3" onClick={onClickShowComments}>
                    { isFetching ? 'loading' : ''}
                </div>
                <div className="r4">
                    {isShowComments && commentsData &&
                        <div className="comments">
                            {
                                commentsData.map((comment) => {
                                    return <TweetDisplay postData={comment} />
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

