import { BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ref } from "firebase/database";
import { useEffect } from "react";
import { database } from "../../config/firebaseConfig";

interface IChatItemProps {
  displayName: string;
  id: string | null;
  status: boolean;
}

export const ChatItem = ({ displayName, id, status }: IChatItemProps) => {
  return (
    <Link to={`/${id}`}>
      <div className="h-32 w-full bg-white flex items-center border-b-2 hover:bg-gray-200 cursor-pointer">
        <div className="mx-3 rounded-full bg-gray-200 flex justify-center items-center h-16 w-20 ">
          <BiUser className="w-8 h-8" />
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-black">{displayName}</p>
          <div className={`rounded-full mr-6 h-6 w-6 ${status ? "bg-green-500" : "bg-red-500"}`}></div>
        </div>
      </div>
    </Link>
  );
};
