import backend from '@/backend/db';
import { getToken } from 'next-auth/jwt';


export async function GET(req: Request, res: any) {
    // const a=await req.json();
    let lastTime = new URLSearchParams(req.url).get('time') || undefined;
    let type = new URLSearchParams(req.url).get('type') || undefined;
    // console.log(req.headers);
    let userToken: any = await getToken({ secret: process.env.NEXTAUTH_SECRET, req });
    console.log('get', lastTime);
    if (userToken == null) {
        return new Response(JSON.stringify({ succsess: false, message: "token is null" })
            , { status: 401 });
    }
    else {
        // backend.getPosts().then((data)=>{
        // const data = await getEvents(parseInt(userToken.id));
        let posts;
        console.log(type);
        if (type == 'user-tweets') {
            posts = await backend.getUserPosts(userToken.id, lastTime);
        }
        else if(type=='user-likes'){
            posts=await backend.getUserLikePosts(userToken.id,lastTime);
        }
        //! get feed tweets
        else {
            posts = await backend.getPosts(userToken.id, lastTime);
        }
        return new Response(JSON.stringify({ succsess: true, message: "", data: posts }));
    }
}