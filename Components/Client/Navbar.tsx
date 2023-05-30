"use client";
import Link from 'next/link';
import React, { FC, useEffect, useRef } from 'react'
import { BsSearch, BsTwitter } from 'react-icons/bs';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import useUserData from '@/app/hooks/useUserData';
import { usePathname } from 'next/navigation';

interface INavbarProps {
    children?: React.ReactNode | React.ReactNode[];
}

const Navbar: FC<INavbarProps> = ({ }: INavbarProps) => {

    const { data: loadingState } = useQuery({
        queryKey: ["loadingState"],
        enabled: false,
        initialData: 'loaded'
    })
    const { data: userData } = useUserData({});

    console.log(loadingState);

    useEffect(() => {
        const elem: HTMLElement = navSpinElem.current;
        if (!elem) return;
        if (loadingState === 'loading' &&
            !elem.classList.contains('loading')) {
            console.log('added');
            elem.classList.remove('loaded')
            elem.classList.add('loading')
        }
        else if (loadingState === 'loaded' &&
            !elem.classList.contains('loaded')) {
            elem.classList.remove('loading')
            elem.classList.add('loaded')
        }

    }, [loadingState])

    const navSpinElem = useRef(null);
    const pathname = usePathname();
    const isActive = (href: any) => usePathname() == href;
    console.log(pathname.includes(`user`));
    return (
        <div className='w-full h-full flex flex-col items-center border-r-2   '>
            <div id='nav-spinner' ref={navSpinElem} className="r r0 loaded  h-2 bg-blue-400"></div>
            <div className="r r1 w-full h-[50px] max-sm:hidden">
                <div className="c w-[50px] h-[50px] flex items-center justify-center">
                    <BsTwitter size={30} />
                </div>
            </div>
            <div className="r r2 h-[300px] w-full flex flex-col  max-sm:flex-row max-sm:h-full" id='nav-container'>
                {/* (Link.flex.w-full[href="/"]>.c.c1.nav-logo+.c.c2.nav-text)         */}
                <Link
                    prefetch={true}
                    href="/"
                    className={` flex w-full h-[50px] ${isActive(`/`) ? 'active' : 'qwe'} hover:bg-slate-400`} >
                    <div className={`c c1  nav-logo w-[50px] h-[50px] flex justify-center items-center`} >
                        <AiOutlineHome size={25} />
                    </div>
                    <div className="c c2 nav-text flex items-center justify-center">Home</div>
                </Link>
                <Link
                    prefetch={true}
                    href={`/user/${userData.id}/user-tweets`}
                    className={` flex w-full h-[50px] ${pathname.includes(`user/${userData.id}`) ? 'active' : ''} hover:bg-slate-400`} >

                    <div className="c c1 nav-logo w-[50px] h-[50px] flex justify-center items-center ">
                        <AiOutlineUser size={25} />
                    </div>
                    <div className="c c2 nav-text flex items-center justify-center">Profile</div>
                </Link>
                <Link
                    prefetch={true}
                    href="/search"
                    className={` flex w-full h-[50px] ${isActive(`/search`) ? 'active' : ''} hover:bg-slate-400`} >
                    <div className="c c1 nav-logo w-[50px] h-[50px] flex justify-center items-center ">
                        <BsSearch size={25} />
                    </div>
                    <div className="c c2 nav-text flex items-center justify-center">Search</div>
                </Link>
            </div>
            <div className="r r3 max-sm:hidden"></div>
        </div>
    )
}
export default Navbar;