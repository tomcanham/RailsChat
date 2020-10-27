export type chatRoomMessage = {
  roomName: string;
  sender: string;
  message: string;
  received: Date;
  mine?: boolean;
};

export type messagePayload = {
  type: string;
  sent_by?: string;
  user?: string;
  body?: string;
  users: string[];
}

export type channel = {
  send: (message: messagePayload) => void;
}