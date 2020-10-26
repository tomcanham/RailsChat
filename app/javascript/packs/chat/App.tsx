import React, { useEffect, useState } from 'react';
import { channel, consumer, createConsumer } from '@rails/actioncable';
import { ChatRoom } from './ChatRoom';
import { chatRoomMessage, chatRoomUser, messagePayload } from './shared';

const users: chatRoomUser[] = [
  { name: 'Tom #1' },
  { name: 'Tom #2' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchRoomUsers = (roomName: string): chatRoomUser[] => users;
const fetchRoomList = (): string[] => ['general', 'cats'];

const App: React.FC<{ roomName: string }> = ({ roomName }: { roomName: string }) => {
  const [wsChannel, setWSChannel] = useState<channel>();
  const [consumer, setConsumer] = useState<consumer>();
  const [messages, setMessages] = useState<chatRoomMessage[]>([]);
  const [roomUsers, setRoomUsers] = useState<chatRoomUser[]>([]);
  const [roomList, setRoomList] = useState<string[]>([]);

  const onMessageReceived = (data: messagePayload) => {
    const newMessage: chatRoomMessage = {
      roomName,
      sender: data.sent_by,
      message: data.body,
      received: new Date(),
    };
    setMessages((m: chatRoomMessage[]) => [...m, newMessage]); // todo: truncate message list for performance, maybe?
  };

  useEffect(() => {
    const consumer = createConsumer();
    setConsumer(consumer);
    const channel = consumer.subscriptions.create({ channel: 'ChatChannel', room: roomName }, { received: onMessageReceived });
    const channel2 = consumer.subscriptions.create({ channel: 'RoomsChannel', room: roomName }, { received: onMessageReceived });
    setWSChannel(channel);
    setRoomUsers(fetchRoomUsers(roomName));
    setRoomList(fetchRoomList());
  }, []);

  const onMessageSubmitted = (user: string, message: string) => {
    wsChannel?.send({ sent_by: user, body: message, mine: true });
  }

  return (
    <div>
      <ChatRoom user="Tom #1"
        consumer={consumer}
        roomName={roomName}
        roomUsers={roomUsers}
        sendMessage={(message: string) => onMessageSubmitted('Tom #1', message)}
        messages={messages}
      />
      <ChatRoom user="Tom #2"
        consumer={consumer}
        roomName={roomName}
        roomUsers={roomUsers}
        sendMessage={(message: string) => onMessageSubmitted('Tom #2', message)}
        messages={messages}
      />
    </div>
  );
};

export default App;