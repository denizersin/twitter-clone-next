import React, { FC } from 'react'

interface IOtherUserProps {
    children?: React.ReactNode | React.ReactNode[],
    userData: any;
}

const OtherUser: FC<IOtherUserProps> = ({ }: IOtherUserProps) => {
    return (
        <div className='OtherUser component'><span>OtherUser</span>

        </div>
    )
}
export default OtherUser;