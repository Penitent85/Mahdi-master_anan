'use server'
import { StreamChat } from 'stream-chat';
import { NextResponse } from 'next/server';



export async function GET(request , params) {

    const a = request.url.split('%7C')
    console.log('user', a[1] )

    try {

        const serverClient = StreamChat.getInstance('8ghmxrx2v98h', 'a3u9bgzw6qdrdz9383c4sn6nd5kzmb8b8fdyw5wuu227v6f3q8n3wwydfnuvz2vg');
        const token = serverClient.createToken(a[1]);
        console.log("token", token )

        return NextResponse.json(token, { status: 200 });
        //return Response.json(articles, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        )
    }
}