'use client'
import React, {useContext, useEffect, useState} from "react";
import {
    CallControls,
    CallingState, ParticipantView,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient, useCall,
    useCallStateHooks,
    User,
} from "@stream-io/video-react-sdk";


import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./layout.css";
import {useParams} from "next/navigation";
import {AppContext} from "@/context/AppContext";

import {error} from "next/dist/build/output/log";











export default function App() {
    const {streamToken, getStreamToken} = useContext(AppContext)
    const [isClientReady, setIsClientReady] = useState(false);
    // const  {id} = useParams();
    const id = "32";
    const apiKey = process.env.NEXT_PUBLIC_GETSTREAM_API_KEY;
    const user = {
        id :id,
        name: "Karam",
        image: "https://getstream.io/random_svg/?id=mahdi&name=Mahdi",
    };
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzIifQ.KQSZz3f1bTQxvcxFrbb0hj2cFUadSRMNtRQkmgXz2cs";
    const client = new StreamVideoClient({apiKey, user, token  });
    const callId = "0000";
    const call = client.call("default", callId);
    // const userId = "32";
    call.join({ create: true });

    useEffect(() => {

        // if(!streamToken) getStreamToken(id);
        // console.log( 'Steam Token',streamToken )

        async function setupClient() {
          try {
              // if (!streamToken) return;

              // console.log( 'Steam Token',streamToken )

                  console.log( 'client',client )
                  if(client) {
                      await client.disconnectUser(1000);
                  }




              call.join({ create: true });
              setIsClientReady(true);
            
          }
          catch (e) {
              console.error(e);

          }
        }
        setupClient();

    },[streamToken] )



    if(!isClientReady) return <div>Setting up client & connection...</div>;

    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>
                <MyUILayout />
            </StreamCall>
        </StreamVideo>
    );
}


export  const  MyParticipantList = ({ participants }) => {
    return (
        <div
        style={
            {
                display: "flex",
                fxDirection: "row",
                gap: "8px",
                width: "100vw",
            }
        }
        >
            {
                participants.map((participant,index) => (
                  <div key={index} style={{
                      width: "100%",
                      aspectRatio: "3/2",
                  }}>
                      <ParticipantView
                      muteAudio
                      participant={participant}
                      // key={participant.sessionID}
                      />

                  </div>
                ))
            }
        </div>
    );
};

export const MyFloatingLocalParticipant = ({participant}) => {
    return (
        <div
        style={{
            // note here
            position: "absolute",
            top: "16px",
            left: "16px",
            width: "240px",
            height: "135px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
        }}
        >
            {/*<ParticipantView*/}
            {/*participant={participant}*/}
            {/*/>*/}
            {
                participant && <ParticipantView muteAudio participant={participant} />
            }
        </div>
    )

}

export const MyUILayout = () => {
    const call = useCall();
    const  { useCallCallingState     }  = useCallStateHooks()
    const callingState = useCallCallingState();


    if (callingState !== CallingState.JOINED) {
        return <div>Loading...</div>;
    }


    return (


          <StreamTheme
          style={{
              position: "relative",
          }}
          >
              <SpeakerLayout participantsBarPosition='bottom' />
              <CallControls />

          </StreamTheme>

    );
};




