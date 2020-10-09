import React from 'react';
import styled from 'styled-components';
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
}

export const ChatRoom: React.FC<chatRoomArgs> = ({
  roomName,
  user,
  roomUsers,
  sendMessage,
  messages,
}: chatRoomArgs) => {
  return (
    <ChatRoomContainer>
      <ChatRoomChannelHeader>{roomName} -- {user}</ChatRoomChannelHeader>
      <ChatRoomMessagesAndUsersContainer>
        <ChatRoomMessageList messages={messages} />
        <ChatRoomUsersList users={roomUsers} />
      </ChatRoomMessagesAndUsersContainer>
      <ChatRoomMessageBar onSubmit={sendMessage} />
    </ChatRoomContainer>
  );
};
