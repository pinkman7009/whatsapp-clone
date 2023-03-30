import { PrimaryButton } from "../common/Buttons";
import { MessageItem } from "./MessageItem";

interface IMessageBoxProps {
  chatRecipient: string;
}

export const MessageBox = ({ chatRecipient }: IMessageBoxProps) => {
  const messages = [
    {
      id: 1,
      name: "Soumik Chaudhuri",
      message: "Hey bro how are you?",
    },
    {
      id: 2,
      name: "Rohan Das",
      message: "I'm doing good man.",
    },
    {
      id: 3,
      name: "Soumik Chaudhuri",
      message: "How is school?",
    },
    {
      id: 4,
      name: "Rohan Das",
      message: "School has been hectic.",
    },
  ];
  return (
    <div className="h-full w-3/4 bg-[url('/public/chat-wallpaper.jpg')] relative">
      <div className="h-[10%] w-full bg-gray-100">
        <p className="font-bold">{chatRecipient}</p>
      </div>
      <div className="h-[75%]">
        {messages.map((message) => (
          <MessageItem message={message} />
        ))}
      </div>
      <div className="bg-gray-300 w-full p-3 flex justify-between absolute bottom-0">
        <textarea
          placeholder="Write a message...."
          className="bg-white rounded-md p-3 w-full mr-3"
          // value={currentMessage}
          // onChange={(e) => setCurrentMessage(e.target.value)}
        ></textarea>
        <PrimaryButton text="Send" size="small" handleClick={() => {}} />
      </div>
    </div>
  );
};
