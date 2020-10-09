import React from 'react';
import { render } from '@testing-library/react';
import { ChatRoom } from './ChatRoom';
import { chatRoomMessage } from './shared';

type getChatRoomArgs = {
  roomName?: string;
  user?: string;
  users?: string[];
  messages?: chatRoomMessage[];
}

const getChatRoom = ({
  roomName = 'general',
  user = 'Tom #1',
  users = ['Tom #1'],
  messages = [],
}: getChatRoomArgs): React.ReactElement => {
  return <ChatRoom user={user}
    roomName={roomName}
    roomUsers={users.map(n => ({ name: n }))}
    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    sendMessage={(message: string) => {}}
    messages={messages}
  />
};
// export type chatRoomMessage = {
//   roomName: string;
//   sender: string;
//   message: string;
//   received: Date;
// };

describe('chatroom', () => {
  it('shows all users', () => {
    const { container } = render(getChatRoom({
      user:"Tom #1",
      roomName: "general",
      users: [
        'Tom #1',
        'Tom #2',
      ],
      messages: [],
    }));
    expect(container).toHaveTextContent('Tom #2');
  });

  it('shows all messages', () => {
    const messages: chatRoomMessage[] = [
      { roomName: 'general', sender: 'Tom #1', message: 'sup bro?', received: new Date() },
      { roomName: 'general', sender: 'Tom #2', message: 'I am the very model', received: new Date() },
    ];

    const { container } = render(getChatRoom({
      user:"Tom #1",
      roomName: "general",
      users: [
        'Tom #1',
        'Tom #2',
      ],
      messages,
    }));

    expect(container).toHaveTextContent('sup bro?');
    expect(container).toHaveTextContent('I am the very model');
  })
});
