import React from 'react';
import { Chat, Channel, ChannelHeader, Thread, Window } from 'stream-chat-react';
import { MessageList, MessageInput } from 'stream-chat-react';
import { Button } from 'react-bootstrap'
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';
import styled from 'styled-components'


const Styles = styled.div`
  background: #333;
  height: 100%;
  text-align:center;
`;


const chatClient = new StreamChat('5cx2ee96rmr9');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicmFzcHktbWF0aC04In0.ONtVRfqubiMNjCQHAF0sdHdCdYAitG6VL28WzBL_5c8';

chatClient.setUser(
  {
       id: 'raspy-math-8',
       name: 'Cory',
       image: 'https://getstream.io/random_svg/?id=raspy-math-8&name=Raspy+math'
  },
  userToken,
);

const channel = chatClient.channel('messaging', 'godevs', {
  // add as many custom fields as you'd like
  image: 'https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png',
  name: 'Talk about Go',
});

const ChatContainer = (props) => {
  if (props.chatting) {
    return (
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
          )} else {
            return (
              <Styles>
                <Button variant="success"
                onClick={() => props.changeShow()}>
                Start Friends Chat
                </Button>
            </Styles>
            
            )
          }
}

export default ChatContainer;