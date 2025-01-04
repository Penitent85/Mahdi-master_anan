'use client'
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "next/navigation";
// const user = 'mahdi';

import {
    useCreateChatClient,
    Chat,
    Channel,
    ChannelHeader,
    ChannelList,
    MessageInput,
    MessageList,
    Thread,
    Window,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import './layout.css';


const filters = {
    type: 'messaging',
    members: { $in: ['mahdi'] },
};
const options = {
    limit: 10,
};
const sort = { last_message_at: -1 };





const Page = () => {
    const params = useParams();
    const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibWFoZGkifQ.b1KET--4NV7Oiq_EroqnRvhTNY34YMbbYNpVtllCNCw')
    const apiKey = '8ghmxrx2v98h';




    useEffect(() => {




            const fetchMessages = async () => {
                try {
                    const {data} = await axios.get(`http://localhost:5173/api/token%7C${user}`   );
                    setToken(data);
                    console.log( 'object', data)
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            };
            fetchMessages();


    }, [token]);


  const  user_id = 'mahdi';


const user = {
    id: user_id,
    name: 'mahdi',
    image: `https://getstream.io/random_png/?name=mahdi`,
};




    const client = useCreateChatClient({
        apiKey,
        tokenOrProvider: token,
        userData: user_id,
    });

    if (!client) return <div>Setting up client & connection...</div>;

    return (
        <Chat client={client}>
            <ChannelList filters={filters} sort={sort} options={options} />
            <Channel>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    );
};

export default Page;






