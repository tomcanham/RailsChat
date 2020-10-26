import React from 'react';
import styled from 'styled-components';
import { ChatRoomMessage } from './ChatRoomMessage';
import { chatRoomMessage } from './shared';

const ChatRoomMessagesContainer = styled.div`
  border: 1px solid black;

  .message-container > .message.mine {
    font-weight: bolder;
    font-style: italic;
  }
  flex-grow: 1;
`;

type tChatRoomMessageListArgs = {
  user: string;
  messages: chatRoomMessage[];
};

export const ChatRoomMessageList: React.FC<tChatRoomMessageListArgs> = ({ user, messages }: tChatRoomMessageListArgs) => {
  const messageList = messages.map((m, idx) => <ChatRoomMessage payload={m} user={user} key={`msg-${idx}`} />);

  return (
    <ChatRoomMessagesContainer>
      {messageList}
    </ChatRoomMessagesContainer>
  );
}
