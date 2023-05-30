import React, { FC } from 'react'

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode | React.ReactNode[],
    isLoading?: boolean;
}

const Button: FC<IButtonProps> = ({ children, isLoading, ...props }: IButtonProps) => {
    return (
        <button {...props} >
            {
                isLoading ? <div className="loader">Loading...</div> :
                    children
            }</button >
    )
}
export default Button;

