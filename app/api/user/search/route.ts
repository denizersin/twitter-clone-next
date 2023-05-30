import prisma from "@/lib/prisma";
import { getUserToken } from "@/lib/utils";
import { getToken } from "next-auth/jwt";
export async function POST(request: Request) {
    const user = await getToken({
        secret: process.env.NEXTAUTH_SECRET,
        req: request
    })

    const urlSP = new URLSearchParams(request.url);
    let searchedValue = urlSP.get('value');
    console.log(searchedValue);
    try {
        const result = await prisma.user.findMany({
            where: {
                name: {
                    startsWith: searchedValue
                }
            }, select: {
                id: true,
                name: true,
                avatar: true,
                displayName: true,
                followersCount: true,
                followingCount: true,
            }

        })
        const promises = result.map(async (element: any) => {
            const result = await prisma.follower.findUnique({
                where: {
                    follower_following:user.id + "_" + element.id
                }
            })
            if (result) element.isFollowed = true;
            else element.isFollowed = false;
        });
        await Promise.all(promises);

        return new Response(JSON.stringify({ succsess: true, message: "", data: result }));
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify({ succsess: false, message: "postId is null" }));
    }



}