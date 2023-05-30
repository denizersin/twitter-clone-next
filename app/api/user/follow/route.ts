import backend from "@/backend/db";

export async function POST(request: Request) {

    const body: any = await request.json()
    try {
        backend.followAUser(body.followerId, body.followedId);
        return new Response(JSON.stringify({ succsess: true, message: "" }));
    }
    catch {
        return new Response(JSON.stringify({ succsess: false, message: "" }));
    }

}
