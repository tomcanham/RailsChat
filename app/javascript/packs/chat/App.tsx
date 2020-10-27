import React, { useEffect, useState } from 'react';
import { channel, consumer, createConsumer } from '@rails/actioncable';
import { ChatRoom } from './ChatRoom';
import { chatRoomMessage, messagePayload } from './shared';

const App: React.FC<{ roomName: string }> = ({ roomName }: { roomName: string }) => {
  const [wsChannel, setWSChannel] = useState<channel>();
  const [consumer, setConsumer] = useState<consumer>();
  const [messages, setMessages] = useState<chatRoomMessage[]>([]);
  const [roomUsers, setRoomUsers] = useState<string[]>([]);

  const onMessageReceived = (data: messagePayload) => {
    if (data.body && data.sent_by) {
      const newMessage: chatRoomMessage = {
        roomName,
        sender: data.sent_by,
        message: data.body,
        received: new Date(),
      };
      setMessages((m: chatRoomMessage[]) => [...m, newMessage]); // todo: truncate message list for performance, maybe?
    }
    setRoomUsers(() => data.users);
  };

  useEffect(() => {
    const consumer = createConsumer();
    setConsumer(consumer);
    const channel = consumer.subscriptions.create({ channel: 'RoomsChannel', room: roomName }, { received: onMessageReceived });
    setWSChannel(channel);
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
    </div>
  );
};

export default App;