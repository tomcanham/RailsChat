export type chatRoomMessage = {
  roomName: string;
  sender: string;
  message: string;
  received: Date;
};

export type chatRoomUser = {
  name: string;
}

export type messagePayload = {
  sent_by: string;
  body: string;
}

export type channel = {
  send: (message: messagePayload) => void;
}