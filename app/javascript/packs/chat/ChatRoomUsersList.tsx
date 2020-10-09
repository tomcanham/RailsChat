import React from 'react';
import styled from 'styled-components';
import { chatRoomUser } from './shared';

const ChatRoomUsersListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatRoomUsersListHeaderContainer = styled.div`
`;

type ChatRoomUsersListArgs = {
  users: chatRoomUser[];
}

export const ChatRoomUsersList: React.FC<ChatRoomUsersListArgs> = ({ users }: ChatRoomUsersListArgs) => {
  return <ChatRoomUsersListContainer>
    <ChatRoomUsersListHeaderContainer>Users</ChatRoomUsersListHeaderContainer>
    {users.map((u, idx) => <div key={`user-${idx}`}>{u.name}</div>)}
  </ChatRoomUsersListContainer>
}
