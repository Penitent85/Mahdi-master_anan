"use client";
import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import { StreamChat } from 'stream-chat';

import {
    Chat,
    Channel,
    ChannelHeader,
    ChannelList,
    MessageInput,
    MessageList,
    Thread,
    Window
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import './layout.css';
import {AppContext} from "@/context/AppContext";
import {useParams} from "next/navigation";


const apiKey = process.env.NEXT_PUBLIC_GETSTREAM_API_KEY;
const client = StreamChat.getInstance(apiKey);

// start main function
const Page = () => {
    const  {id} = useParams();
    const {getUser1, getUser2, user1Data, user2Data  ,streamToken,userId, getStreamToken ,setNotifications} = useContext(AppContext);
    const [user1, setUser1] = useState()
    const [user2, setUser2] = useState()
    const [userName1, setUserName1] = useState()
    const [userName2, setUserName2] = useState()

    const filters = {
        type: 'messaging',
        members: { $in: [id] },
    };
    const options = {
        limit: 2,
    };
    const sort = { last_message_at: -1 };

    const [isClientReady, setIsClientReady] = useState(false);


    useEffect(() => {
        if(!streamToken) getStreamToken(id);
        if (id) {
            getUser1(id);
            setUserName1(user1Data?.data?.first_name + user1Data?.data?.last_name);
        }
        if (userId) {
            getUser2(userId);
            setUserName2(user2Data?.data?.first_name + user2Data?.data?.last_name);
        }

    }, [userId ,streamToken ]);

    useEffect(() => {
        async function setupClient() {

            if (client.userID) {
                await client.closeConnection(1000);
            }
            if (!streamToken) return;
            console.log( 'doctor name' , )
            try {
                await client.connectUser(
                    {
                        id : id,
                        name: userName1,
                        image: "https://i.imgur.com/fR9Jz14.png",
                    },
                    streamToken
                );

                const channel = client.channel("messaging", {
                    members: [userId, id],
                    name: `Dr. ${userName1} Chat with Dr. ${userName2} `,
                });

                await channel.watch();

                const text = null;
                await channel.sendMessage({
                    text,
                    customField: "123",
                });

                setIsClientReady(true);

                channel.on("message.new", (event) => {
                    console.log('event',event.message);
                    setNotifications(event.message.text);
                });
                channel.watch();

            } catch (error) {
                console.error("Error setting up client:", error);
            }

        }
        setupClient();

    }, [streamToken , userName1 , userName2]); //

    if(!isClientReady) return <div>Setting up client & connection...</div>;

    return (
      <div>
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
      </div>
    );
};

export default Page;
