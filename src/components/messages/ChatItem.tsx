import { BiUser } from "react-icons/bi";

import { User } from "../../types";

interface IChatItemProps {
  user: User;
}

export const ChatItem = ({ user }: IChatItemProps) => {
  const { name, email } = user;
  return (
    <div className="h-32 w-full bg-white flex items-center border-b-2 hover:bg-gray-200 cursor-pointer">
      <div className="mx-6 rounded-full bg-gray-200 flex justify-center items-center h-16 w-16 ">
        <BiUser className="w-8 h-8" />
      </div>
      <div>
        <p className="text-black">{name}</p>
        <p className="text-black font-light">{email}</p>
      </div>
    </div>
  );
};
