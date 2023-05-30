import backend from "@/backend/db";
import { User } from "@prisma/client";


export async function POST(request: Request) {
    const body: User = await request.json();

    const user = await backend.createUser(body);
    if (user) {
        const { password, ...result } = user;
        return new Response(JSON.stringify({succsess: true, message: "", data: result}));
    }
    else {
        return new Response(JSON.stringify({ succsess: false, message: "" }));
    }

}
