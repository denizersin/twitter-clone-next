import backend from "@/backend/db";
import prisma from '@/lib/prisma';



export async function POST(request: Request) {
    const body: any = await request.json();
    console.log(body);
    try {
        if (body.type == 'normal') {
            const user: any = await prisma.post.create({
                data: {
                    ownerId: body.ownerId,
                    type: "normal",
                    normalPost: {
                        create: {
                            content: body.content
                        }
                    }
                },
                include: {
                    normalPost: true
                }
            })

            const { password, ...result } = user;
            return new Response(JSON.stringify({ succsess: true, message: "", data: result }));
        }


        else if (body.type == 'repost') {
            const user: any = await prisma.post.create({
                data: {
                    ownerId: body.ownerId,
                    type: "repost",
                    repost: {
                        create: {
                            repostedPostId: body.repostedPostId
                        }
                    }
                },
                include: {
                    repost: true
                }
            })
            await prisma.post.update({
                where: {
                    id: body.repostedPostId
                },
                data: {
                    repostCount: {
                        increment: 1
                    }
                }
            })

            const { password, ...result } = user;



            return new Response(JSON.stringify({ succsess: true, message: "", data: result }));
        }
        else if (body.type == 'comment-post') {

            const postData = await backend.commentAPost(parseInt(body.ownerId), body)
            console.log(postData);
            return new Response(JSON.stringify({ succsess: true, message: "", data: postData }));
        }
        else if (body.type == 'comment-comment') {

            const postData = await backend.commentAComment(parseInt(body.ownerId), body)
            console.log(postData);

            return new Response(JSON.stringify({ succsess: true, message: "", data: postData }));
        }
        else return new Response(JSON.stringify({ succsess: false, message: "type is not valid" }));
    }
    catch (e: any) {
        return new Response(JSON.stringify({ succsess: false, message: e.message }));
    }
}