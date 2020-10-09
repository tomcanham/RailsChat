import React from 'react';
import styled from 'styled-components';
import { chatRoomUser } from './shared';

const ChatRoomUsersListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;

  & > li.user {
    display: list-item;
    list-style-type: square;
  };
`;

const ChatRoomUsersListHeaderContainer = styled.div`
`;

type ChatRoomUsersListArgs = {
  user: string,
  users: chatRoomUser[];
}

export const ChatRoomUsersList: React.FC<ChatRoomUsersListArgs> = ({
  user,
  users, 
}: ChatRoomUsersListArgs) => {
  return <ChatRoomUsersListContainer>
    <ChatRoomUsersListHeaderContainer>Users</ChatRoomUsersListHeaderContainer>
    {users.map((u, idx) => <li key={`user-${idx}`} className={u.name === user ? 'user' : ''}>{u.name}</li>)}
  </ChatRoomUsersListContainer>
}
