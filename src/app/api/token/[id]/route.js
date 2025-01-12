'use server'
import { StreamChat } from 'stream-chat';
import { NextResponse } from 'next/server';


const apiKey= process.env.NEXT_PUBLIC_GETSTREAM_API_KEY;
const apiSecret= process.env.NEXT_PUBLIC_GETSTREAM_SECRET_KEY;
export async function GET(request , params) {

    const a = request.url.split('http://localhost:5173/api/token/')
      const user =a[1];

    console.log( typeof user)
    console.log( 'user',user)
    try {

        const serverClient = StreamChat.getInstance(apiKey, apiSecret);
        const token = serverClient.createToken(user);
        console.log( 'token',token )
        return NextResponse.json(token, { status: 200 });


    } catch (error) {
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        )
    }
}