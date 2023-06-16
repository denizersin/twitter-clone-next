"use client";
import { useRouter } from 'next/navigation';
import React, { FC, FormEventHandler, useState } from 'react'

interface IpageProps {
    children?: React.ReactNode | React.ReactNode[];
}

const Register: FC<IpageProps> = ({ }: IpageProps) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const route = useRouter();
    // On form submit, call the register function

    const registerUser = async () => {
        console.log('qwe');
        setIsLoading(true);
        let data = await fetch('http://localhost:3000/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },    
            body: JSON.stringify({ email, password, name, displayName: firstName }),
        })
        let Data: any = await data.json();
        console.log(data);
        if (Data.succsess) {
            setIsLoading(false);
            if (data) {
                setSuccess(true);
                setTimeout(() => {
                    route.push('/auth/login');
                }, 2000);
            }
        }
        else {
            setIsLoading(false);
            alert('error' + Data.message);
        }
    }
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        registerUser();
    };

    const router = useRouter();

    return (
        <div>
            <h1>Register</h1>
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
                <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                />


                <button type="submit">Register</button>
                <button type="button" onClick={()=>router.push('/auth/login')}>Login</button>

            </form>
            {
                isLoading && <p>Loading...</p>
            }
            {
                success && <p>You are registered succsessfully you are redirecting to login</p>
            }
        </div>
    )
}
export default Register;