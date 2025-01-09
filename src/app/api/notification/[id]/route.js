'use server'
import { StreamChat } from 'stream-chat';
import { NextResponse } from 'next/server';



export async function GET(request , params) {

    let notification = 0;



    try {
        notification++;

        return NextResponse.json(notification, { status: 200 });
        //return Response.json(articles, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        )
    }
}

