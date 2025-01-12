"use client";
import React, { useContext, useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { useRouter } from "next/navigation";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import "./layout.css";
import { AppContext } from "@/context/AppContext";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

const apiKey = process.env.NEXT_PUBLIC_GETSTREAM_API_KEY;

// start main function
const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const { getUser1, userId, streamToken, getStreamToken } =
    useContext(AppContext);
  const [userName1, setUserName1] = useState("");
  const [userName2, setUserName2] = useState("");
  const [user1, setUser1] = useState({});
  const [user2, setUser2] = useState({});
  const client = StreamChat.getInstance(apiKey);

  const filters = {
    type: "messaging",
    members: { $in: [id] },
  };
  const options = {
    limit: 2,
  };
  const sort = { last_message_at: -1 };

  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    if (!streamToken) getStreamToken(id);
    // for doctor
    if (id) {
      const data = getUser1(id);
      data.then((res) => {
        setUser1(res.data);
      });
      if (user1) setUserName1(user1.first_name + " " + user1.last_name);
    }
    // for user
    if (userId) {
      const data = getUser1(userId);
      data.then((res) => {
        setUser2(res.data);
      });
      if (user2) setUserName2(user2.first_name + " " + user2.last_name);
    }
  }, [userId, id, userName1, userName2, streamToken]);

  useEffect(() => {
    if (client.userID) return;
    if (!userId) {
      toast.error("Please login to continue");
      router.push("/login");
      return;
    }
    if (!user1) return;
    if (!user2) return;
    if (!streamToken) return;
    async function setupClient() {
      try {
        await client.connectUser(
          {
            id: id,
            name: user1.first_name,
            image: `https://getstream.io/random_png/?name=${user1.first_name}`,
          },
          streamToken
        );

        const channel = client.channel("messaging", {
          members: [userId, id],
          name: `${user1.first_name} and ${user2.first_name}`,
        });
        await channel.create();

        setIsClientReady(true);
        const text = "";

        await channel.sendMessage({
          text,
        });

        await channel.watch();
      } catch (error) {
        console.error("Error setting up client:", error);
      }
    }

    setupClient();
  }, [
    client,
    isClientReady,
    id,
    router,
    userId,
    streamToken,
    userName1,
    userName2,
  ]); //

  if (client)
    if (id === userId) {
      // console.log( 'client',client)

      return (
        <div className=" m-4 justify-center  bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h1 className="text-xl font-semibold text-gray-800">
              You can't send a message to yourself
            </h1>
          </div>
        </div>
      );
    }
  console.log(client);

  if (!isClientReady) return <div>Setting up client & connection...</div>;

  return (
    <div>
      <Chat client={client} key={client.activeChannels.id}>
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



