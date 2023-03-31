import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Message } from "../../types";

interface IMessageItemProps {
  message: Message;
}

export const MessageItem = ({ message }) => {
  const { currentUser } = useContext(AuthContext);

  const { senderName, senderID, text, messageInfo, createdAt } = message;

  const CheckMessageInfo = (msgState) => {
    switch (msgState) {
      case 0:
        return "https://img.icons8.com/material-outlined/24/000000/checkmark--v1.png";
      case 1:
        return "https://img.icons8.com/fluency-systems-regular/48/000000/double-tick.png";
      case 2:
        return "https://img.icons8.com/color-glass/48/000000/double-tick.png";
    }
  };

  return (
    <div className={`flex ${senderID === currentUser.uid ? "justify-end" : "justify-start"}`}>
      <div
        className={`${
          senderID === currentUser.uid ? "bg-primary-light" : "bg-white"
        } w-auto inline-block p-6 rounded-md m-6 border-2 border-black`}
      >
        {message.text}
        {message.senderID === currentUser.uid && (
          <img className="message-state" src={CheckMessageInfo(message.messageInfo)} />
        )}
      </div>
    </div>
  );
};
