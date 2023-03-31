import { useState, useContext } from "react";
import { User } from "../../types";
import { ChatItem } from "./ChatItem";
import { Searchbar } from "../common/Searchbar";
import { AuthContext } from "../../context/auth";
import { database } from "../../config/firebaseConfig";
import { useEffect } from "react";
import { ref, onDisconnect, onValue, onChildChanged } from "firebase/database";

export const ChatSidebar = () => {
  const { currentUser } = useContext(AuthContext);
  const [userFriends, setUserFriends] = useState([]);

  useEffect(() => {
    const usersRef = ref(database, "users");

    // const usersRef = ref(database, "users");
    onValue(usersRef, (snapshot) => {
      let users = [];
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.val());
        if (childSnapshot.key !== currentUser.uid) {
          users.push({
            key: childSnapshot.key,
            userDetails: childSnapshot.val(),
          });
        }
      });
      console.log({ usersfields: users });
      setUserFriends(users);
    });

    // const dbRef2 = ref(database, `users/${currentUser.uid}`);
    // onDisconnect(dbRef).set({ name: currentUser.displayName, onlineStatus: false });
  }, []);

  console.log({ userFriends });

  return (
    <div className="h-full w-1/4 bg-white">
      <Searchbar users={userFriends} />
      {userFriends.map((user) => {
        console.log({ user });
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
