import React, { useState } from 'react';
import styled from 'styled-components';

const ChatRoomMessageBarContainer = styled.input`
`;

type chatRoomMessageBarArgs = {
  onSubmit: (message: string) => void;
}

export const ChatRoomMessageBar: React.FC<chatRoomMessageBarArgs> = ({ onSubmit }: chatRoomMessageBarArgs) => {
  const [message, setMessage] = useState<string>('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter' && message.length > 0) {
      onSubmit(message);
      setMessage('');
    }
  }

  return (
    <ChatRoomMessageBarContainer type="text" value={message} onChange={onChange} onKeyPress={onKeyPress} />
  );
};