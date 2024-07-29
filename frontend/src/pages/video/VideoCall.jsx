import React from 'react'
import {useParams} from "react-router-dom"
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"


const VideoCall = () => {

    const {roomId} = useParams();

    const myMeeting = async (element)=>{//what is this element? this is where the zego cloud will implment its ui

        const appID = 134604635;
        const serverSecret = "441e49b8f0f10ad44fd89528274a4ef7";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,roomId,Date.now().toString(),"Owner");

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container:element,
            sharedLinks:[
                {
                    name:'Copy Link',
                    url: `${window.location.origin}/room/${roomId}`
                }
            ],
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton:true,
        })
    };

  return (
    <div>
        <div ref={myMeeting}/>
    </div>
  )
}

export default VideoCall;