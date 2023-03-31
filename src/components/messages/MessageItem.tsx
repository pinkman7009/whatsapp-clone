import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Message } from "../../types";
import { AiOutlineCheck } from "react-icons/ai";
import { BsCheck2All } from "react-icons/bs";

interface IMessageItemProps {
  message: Message;
}

export const MessageItem = ({ message }: IMessageItemProps) => {
  const { currentUser } = useContext(AuthContext);

  const { senderID, text, messageStatus } = message;

  const checkMessageStatusIcon = (messageStatus: 0 | 1 | 2) => {
    switch (messageStatus) {
      case 0:
        return <AiOutlineCheck />;
      case 1:
        return <BsCheck2All />;
      case 2:
        return <BsCheck2All className="text-teal-600" />;
    }
  };

  return (
    <div className={`flex ${senderID === currentUser.uid ? "justify-end" : "justify-start"}`}>
      <div
        className={`${
          senderID === currentUser.uid ? "bg-primary-light" : "bg-white"
        } w-auto inline-block p-6 rounded-md m-6 border-2 border-black`}
      >
        <p>{text}</p>
        {senderID === currentUser.uid && checkMessageStatusIcon(messageStatus)}
      </div>
    </div>
  );
};
