import { Message } from "../../types";

interface IMessageItemProps {
  message: Message;
}

export const MessageItem = ({ message }: IMessageItemProps) => {
  return (
    <div className={`flex ${message.name === "Soumik Chaudhuri" ? "justify-end" : "justify-start"}`}>
      <div
        className={`${
          message.name === "Soumik Chaudhuri" ? "bg-primary-light" : "bg-white"
        } w-1/4 p-6 rounded-md m-6 border-2 border-black`}
      >
        {message.message}
      </div>
    </div>
  );
};
