export interface Message {
  text: string;
  senderID: string;
  senderName: string;
  messageStatus: 0 | 1 | 2;
  createdAt: number;
}
