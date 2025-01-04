'use client'
import React, {useEffect} from 'react';
import {token} from "@/lib/steam";

console.log( 'object', token)
import { StreamChat } from 'stream-chat';
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
// import './layout.css';


import { useParams } from 'next/navigation'
import axios from "axios";









// const user = {
//     id: userId,
//     name: userName,
//     image: `https://getstream.io/random_png/?name=${userName}`,
// };

const sort = { last_message_at: -1 };
const filters = {
    type: 'messaging',
    members: { $in: [userId] },
};
const options = {
    limit: 10,
};

const App = () => {
    // const client = useCreateChatClient({
    //     apiKey,
    //     tokenOrProvider: userToken,
    //     userData: user,
    // });





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

export default App;