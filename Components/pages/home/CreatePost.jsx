import useUserData from '@/app/hooks/useUserData';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { FC, useState } from 'react'
import useCreatePostM from '@/app/hooks/useCreatePostM';





const CreatePost = ({ }) => {
    const [text, setText] = useState("");

    const queryClient = useQueryClient();

    const { data: userData } = useUserData({});

    const { mutate: createPostMutate, isLoading } = useCreatePostM({
        onSuccess: (result) => {
            console.log(result)
            if (result.succsess) {
                queryClient.invalidateQueries(['posts']);
                setText("");
            }   
        },
        mutationKey: ['post', 'create']
    });


    const handlePost = (e) => {
        createPostMutate({
            ownerId: userData.id,
            content: text,
            type: "normal",
        })
    }

    return (
        <div className="container border-b border-b-gray-300">

            <div className='CreatePost component flex w-full h-full'>
                <div className="c c1 w-[50px] shrink-0 ">
                    <img src={userData.avatar||"https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png"} alt="" className='w-[50px] h-[50px] rounded-full' />
                </div>
                <div className="c c2 grow flex flex-col">
                    <div className="r r1">
                        <textarea value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder='What is Happening?' name="" id="" 
                            className='w-full h-[100px] p-2 text-xl'></textarea>
                    </div>
                    <div className="r r2 flex gap-4">
                        <div className="c c1 grow">

                        </div>
                        <div className="c c2   flex justify-center">
                            <button onClick={handlePost} disabled={isLoading}
                                className='btn-alternative bg-blue-400 text-white rounded-3xl'>
                                {isLoading ? "loading..." : "Tweet"}</button>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && <div className="loading w-full h-[20px] flex justify-center items-center">Loading...</div>}
        </div>
    )
}
export default CreatePost;


{/* <button onClick={() => {
    mutate({
        id: 534,
        ownerId: 1,
        content: 'qwe',
        createdAt: "2023-05-21T21:58:02.323Z",
        type: "normal",
        repostCount: 0,
        commentCount: 0,
        likeCount: 0,
    })
}}>new</button> */}