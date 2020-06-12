import React from 'react';
import { Chat, Channel, ChannelHeader, Thread, Window } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import 'stream-chat-react/dist/css/index.css';

const chatClient = new StreamChat('5cx2ee96rmr9');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicmFzcHktbWF0aC04In0.ONtVRfqubiMNjCQHAF0sdHdCdYAitG6VL28WzBL_5c8';

chatClient.setUser(
  {
       id: 'raspy-math-8',
       name: 'Raspy math',
       image: 'https://getstream.io/random_svg/?id=raspy-math-8&name=Raspy+math'
  },
  userToken,
);

const channel = chatClient.channel('messaging', 'godevs', {
  // add as many custom fields as you'd like
  image: 'https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png',
  name: 'Talk about Go',
});

const ChatContainer = () => (
  <Chat client={chatClient} theme={'messaging dark'}>
    <Channel channel={channel}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default ChatContainer;