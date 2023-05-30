import React from 'react'
import Post from './Post'
import { FaRegComment } from 'react-icons/fa'

export default function Comment({postData}) {

    return (
        <div className={'Comment component w-full h-full flex flex-col'}>
            <div className="r r1 flex items-center gap-2">
            <FaRegComment className='cursor-pointer' size={19} />
            {postData.owner.displayName} Commented
            </div>
            <div className="r r2">
                <Post postData={postData} />
            </div>
        </div>
    )
}
