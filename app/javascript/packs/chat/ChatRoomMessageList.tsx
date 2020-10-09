import React from 'react';
import styled from 'styled-components';
import { ChatRoomMessage } from './ChatRoomMessage';
import { chatRoomMessage } from './shared';

const ChatRoomMessagesContainer = styled.div`
  border: 1px solid black;

  .message-container:nth-child(even) > .message {
    background-color: cyan;
  }
  flex-grow: 1;
`;

type tChatRoomMessageListArgs = {
  messages: chatRoomMessage[];
};

export const ChatRoomMessageList: React.FC<tChatRoomMessageListArgs> = ({ messages }: tChatRoomMessageListArgs) => {
  const messageList = messages.map((m, idx) => <ChatRoomMessage payload={m} key={`msg-${idx}`} />);

  return (
    <ChatRoomMessagesContainer>
      {messageList}
    </ChatRoomMessagesContainer>
  );
}
