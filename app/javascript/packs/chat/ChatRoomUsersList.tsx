import React from 'react';
import styled from 'styled-components';
import { chatRoomUser } from './shared';

const ChatRoomUsersListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  border: 1px solid black;

  & > li.user {
    display: list-item;
    list-style-type: square;
    font-weight: bold;
  };
`;

const ChatRoomUsersListHeaderContainer = styled.div`
  font-weight: bold;
  text-decoration: underline;
  font-size: larger;
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
