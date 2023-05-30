import backend from '@/backend/db';
import { getToken } from 'next-auth/jwt';


export async function GET(req: Request, res: any) {
    // const a=await req.json();

    let postId = new URLSearchParams(req.url).get('postId') || undefined;
    // console.log(req.headers);
    let userToken: any = await getToken({ secret: process.env.NEXTAUTH_SECRET, req });
    if (userToken == null || postId == undefined) {
        return new Response(JSON.stringify({ succsess: false, message: "token is null" })
            , { status: 401 });
    }

    const comments = await backend.getComments(parseInt(postId), userToken.id);
    console.log(comments);
    console.log('comments');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return new Response(JSON.stringify({ succsess: true, message: "", data: comments }));
}