import { User } from "../../types";
import { ChatItem } from "./ChatItem";
import { Searchbar } from "../common/Searchbar";

export const ChatSidebar = () => {
  const userFriends = [
    {
      id: 1,
      name: "Rohan Das",
      email: "rohan@gmail.com",
    },
    {
      id: 2,
      name: "Soham Ghosh",
      email: "soham@gmail.com",
    },
    {
      id: 3,
      name: "Vaibhav Rohra",
      email: "vaibhav@gmail.com",
    },
  ];
  return (
    <div className="h-full w-1/4 bg-white">
      <Searchbar users={userFriends} />
      {userFriends.map((user: User) => (
        <ChatItem key={user.id} user={user} />
      ))}
    </div>
  );
};
