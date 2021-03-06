import React from 'react';
import styled from 'styled-components';
import { chatRoomMessage } from './shared';

const ChatRoomMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: .25rem;
  
  & > .sender {
    min-width: 100px;
    background-color: silver;
    padding: .25rem;
    margin-right: .25rem;
  }

  & > .message {
    flex-grow: 1;
    padding: .25rem;
  }
`;

type chatRoomMessageArgs = {
  payload: chatRoomMessage;
  user: string;
}

export const ChatRoomMessage: React.FC<chatRoomMessageArgs> = ({ payload, user }: chatRoomMessageArgs) => {
  console.log('payload.sender:', payload.sender, 'user:', user);
  return (
    <ChatRoomMessageContainer className="message-container">
      <span className="sender">{payload.sender}</span>
      <span className={`message ${payload.sender === user ? 'mine' : ''}`}>{payload.message}</span>
    </ChatRoomMessageContainer>
  );
};
