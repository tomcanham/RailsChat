import React from 'react';
import styled from 'styled-components';
import { consumer } from '@rails/actioncable';
import { ChatRoomMessageBar } from './ChatRoomMessageBar';
import { ChatRoomMessageList } from './ChatRoomMessageList';
import { ChatRoomUsersList } from './ChatRoomUsersList';
import { chatRoomMessage, chatRoomUser } from './shared';

const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatRoomChannelHeader = styled.h1`
`;

const ChatRoomMessagesAndUsersContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

type chatRoomArgs = {
  roomName: string;
  user: string;
  roomUsers: chatRoomUser[];
  sendMessage: (message: string) => void;
  messages: chatRoomMessage[];
  consumer: consumer;
}

export const ChatRoom: React.FC<chatRoomArgs> = ({
  roomName,
  user,
  roomUsers,
  sendMessage,
  messages,
  consumer,
}: chatRoomArgs) => {
  return (
    <ChatRoomContainer>
      <ChatRoomChannelHeader>{roomName}</ChatRoomChannelHeader>
      <ChatRoomMessagesAndUsersContainer>
        <ChatRoomMessageList user={user} messages={messages} />
        <ChatRoomUsersList user={user} users={roomUsers} />
      </ChatRoomMessagesAndUsersContainer>
      <ChatRoomMessageBar onSubmit={sendMessage} />
    </ChatRoomContainer>
  );
};
