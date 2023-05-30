"use client";
import useUserData from '@/app/hooks/useUserData';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'

export default function SearchClient() {
    const { data: userData } = useUserData({});
    const [searchText, setSearchText] = useState('');
    const [followMutationId, setFollowMutationId] = useState(null);
    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey: ['search', searchText],
        queryFn: async () => {
            console.log('fetching search results')
            const result = await fetch(`http://localhost:3000/api/user/search?&value=${searchText}`, { method: 'POST' })
                .then(res => res.json())
            console.log(result, 'result')
            if (result.succsess) {
                return result.data;
            }
            return []
        },
        enabled: false,
        initialData: [],
    })
    const { mutate: followMutation, isLoading: isFollowLoading } = useMutation({
        mutationKey: ['user-follow',],
        mutationFn: async (body) => {
            let result;
            if (body.action === 'follow') {

                result = await fetch(`http://localhost:3000/api/user/follow`, { method: 'POST', body: JSON.stringify(body) })
                    .then(res => res.json())
            }
            else {
                result = await fetch(`http://localhost:3000/api/user/unfollow`, { method: 'POST', body: JSON.stringify(body) })
                    .then(res => res.json())
            }

            if (result.succsess) {
                return result;
            }
            return []
        },
        onSuccess: (data) => {
            console.log(data, 'data')
            if (data.succsess) {
                query.refetch();
            }
        }
    })
    const handleFollow = async (e, user) => {
        setFollowMutationId(user.id);
        if (user.isFollowed) {
            followMutation({ action: 'unfollow', followerId: userData.id, followedId: user.id })
        }
        else {
            followMutation({ action: 'follow', followerId: userData.id, followedId: user.id })
        }
    }
    const handleSearch = () => {
        if (query.isLoading) return;
        query.refetch();
    }


    return (
        <div className={'SearchClient component w-full h-full border border-red-400'}>
            <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <button onClick={handleSearch}>{
                query.isFetching ? 'Loading...' : 'Search'
            }</button>
            <div className="users w-full border ">
                {
                    query.data && query.data.map((user) => (
                        <div className="user flex h-[60px] w-full gap-4 border " key={user.id}>
                            <div className="c c1 w-[50px]">
                                <img
                                    className='w-[50px] h-[50px] rounded-full'
                                    src={user.avatar || "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png"} alt="" />
                            </div>
                            <div className="c c2 grow flex items-center gap-3">
                                <span className='font-bold'>{user.displayName}</span>
                                <span className='text-gray-600'>@{user.name}</span>
                                <button disabled={isFollowLoading} onClick={(e) => handleFollow(e, user)}>
                                    {isFollowLoading && user.id==followMutationId ? 'Loading...' : user.isFollowed ? 'Unfollow' : 'Follow'}
                                </button>
                            </div>

                        </div>
                    ))
                }
                {
                    !query.isFetching && query.data && query.data.length === 0 && (
                        <div className="no-result">
                            No result
                        </div>
                    )
                }
            </div>

        </div>
    )
}
