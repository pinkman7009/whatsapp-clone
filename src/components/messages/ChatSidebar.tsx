import { useState, useContext } from "react";
import { User } from "../../types";
import { ChatItem } from "./ChatItem";
import { AuthContext } from "../../context/auth";
import { database } from "../../config/firebaseConfig";
import { useEffect } from "react";
import { ref, onValue } from "firebase/database";

interface IUser {
  key: string | null;
  userDetails: {
    online: {
      online: boolean;
      displayName: string;
    };
  };
}

export const ChatSidebar = () => {
  const { currentUser } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [userFriends, setUserFriends] = useState<IUser[]>([]);

  useEffect(() => {
    const usersRef = ref(database, "users");
    onValue(usersRef, (snapshot) => {
      let users: IUser[] = [];
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.key !== currentUser.uid) {
          users.push({
            key: childSnapshot.key,
            userDetails: childSnapshot.val(),
          });
        }
      });
      setUserFriends(users);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  let filteredUsers;
  if (searchText === "") filteredUsers = userFriends;
  else {
    filteredUsers = userFriends.filter((user) =>
      user.userDetails.online.displayName.toLowerCase().includes(searchText.toLowerCase()),
    );
  }

  return (
    <div className="h-full w-1/4 bg-white">
      <div className="w-full">
        <input
          type="text"
          placeholder="Search users"
          className="w-full h-12 p-3 border-b-2 border-gray-200 focus:outline-none"
          value={searchText}
          onChange={handleChange}
        />
      </div>
      {filteredUsers.map((user) => {
        return (
          <ChatItem
            key={user.key}
            id={user.key}
            status={user.userDetails.online.online}
            displayName={user.userDetails.online.displayName}
          />
        );
      })}
    </div>
  );
};
