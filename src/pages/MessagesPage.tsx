import { ChatSidebar } from "../components/messages/ChatSidebar";
import { MessageBox } from "../components/messages/MessageBox";

const MessagesPage = () => {
  return (
    <>
      <div className="h-screen pt-12 bg-primary">
        <p className="text-2xl font-bold text-white text-center mb-6">Whatsapp Clone</p>
        <div className="h-[800px] w-full flex">
          <ChatSidebar />
          <MessageBox />
        </div>
      </div>
    </>
  );
};

export default MessagesPage;
