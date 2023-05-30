import React from 'react'

export default function PageContainer({children}) {
    return (
        <div className={'PageContainer component w-full h-full min-h-full'}> 
            {children}
        </div>
    )
}
