import backend from "@/backend/db";
import { getToken } from "next-auth/jwt";

export async function POST(request: Request) {
    const user = await getToken({
        secret: process.env.NEXTAUTH_SECRET,
        req: request
    })
    const urlSP = new URLSearchParams(request.url);
    let postId = urlSP.get('postid');
    let action = urlSP.get('action');
    console.log(postId,action);
    if (!postId) return new Response(JSON.stringify({ succsess: false, message: "postId is null" }));
    try {
        if (action == "unlike") {
            await backend.unlikePost(user.id, parseInt(postId));
            return new Response(JSON.stringify({ succsess: true, message: "" }));

        }
        else if (action == "like") {
            await backend.likePost(user.id, parseInt(postId));
            return new Response(JSON.stringify({ succsess: true, message: "" }));
        }
        else return new Response(JSON.stringify({ succsess: false, message: "action is null" }));
    }
    catch (e) {
        return new Response(JSON.stringify({ succsess: false, message: "postId is null" }));
    }

}
