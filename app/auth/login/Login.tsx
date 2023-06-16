"use client";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { FC, FormEventHandler, useEffect, useState } from 'react'

interface IpageProps {
    children?: React.ReactNode | React.ReactNode[];
}

const Login: FC<IpageProps> = ({ }: IpageProps) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        signIn("credentials", {
            username: email,
            password: password,
            redirect: true,
            callbackUrl: "/", //! Where to redirect to on success.
        })

        console.log(e);
        setIsSubmitting(true);
    };

    const router=useRouter();



    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                />
                <button type="submit">Login</button>
                <br />
                <button type='button' onClick={() => {router.push('/auth/register'); }}>
                    Register
                </button>
                {isSubmitting && <p>Logging in...</p>}
            </form>
        </div>
    )
}
export default Login;