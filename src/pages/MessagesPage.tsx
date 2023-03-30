import { ChatSidebar } from "../components/messages/ChatSidebar";
import { MessageBox } from "../components/messages/MessageBox";

const MessagesPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-primary">
      <div className="h-[800px] w-full flex">
        <ChatSidebar />
        <MessageBox chatRecipient={"Rohan Das"} />
      </div>
    </div>
  );
};

export default MessagesPage;
