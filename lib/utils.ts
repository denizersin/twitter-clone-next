import { cookies } from 'next/dist/client/components/headers'
import { decode, getToken } from 'next-auth/jwt'
import prisma from './prisma';

export async function getUserToken(): Promise<any> {

    //!on SSC

    let session = cookies().get('next-auth.session-token');
    if (!session) return null;

    const userData = await decode({
        token: session.value,
        secret: process.env.NEXTAUTH_SECRET || '',
    });
    if(!userData) return null;
    const user = await prisma.user.findUnique({
        where: {
            id: userData.id
        }
    })
    return user;
}