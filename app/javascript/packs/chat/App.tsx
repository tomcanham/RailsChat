import React, { useEffect, useState } from 'react';
import { channel, createConsumer } from '@rails/actioncable';
import { ChatRoom } from './ChatRoom';
import { chatRoomMessage, chatRoomUser, messagePayload } from './shared';

const users: chatRoomUser[] = [
  { name: 'Tom #1' },
  { name: 'Tom #2' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getRoomUsers = (roomName: string): chatRoomUser[] => users;

const App: React.FC = () => {
  const [wsChannel, setWSChannel] = useState<channel>();
  const [messages, setMessages] = useState<chatRoomMessage[]>([]);

  const onMessageReceived = (data: messagePayload) => {
    const newMessage: chatRoomMessage = {
      roomName: 'general',
      sender: data.sent_by,
      message: data.body,
      received: new Date(),
    };
    setMessages((m: chatRoomMessage[]) => [...m, newMessage]);
  };

  useEffect(() => {
    const consumer = createConsumer();
    const channel = consumer.subscriptions.create({ channel: 'ChatChannel', room: 'general' }, { received: onMessageReceived });

    setWSChannel(channel);
  }, []);

  const onMessageSubmitted = (user: string, message: string) => {
    wsChannel?.send({ sent_by: user, body: message });
  }

  return (
    <div>
      <ChatRoom user="Tom #1"
        roomName="general"
        roomUsers={getRoomUsers('roomName')}
        sendMessage={(message: string) => onMessageSubmitted('Tom #1', message)}
        messages={messages}
      />
      <ChatRoom user="Tom #2"
        roomName="general"
        roomUsers={getRoomUsers('roomName')}
        sendMessage={(message: string) => onMessageSubmitted('Tom #2', message)}
        messages={messages}
      />
    </div>
  );
};

export default App;