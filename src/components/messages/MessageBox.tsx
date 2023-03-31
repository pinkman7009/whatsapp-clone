import { useState, useEffect, useContext } from "react";
import { PrimaryButton } from "../common/Buttons";
import { MessageItem } from "./MessageItem";
import { Message } from "../../types";

import { AuthContext } from "../../context/auth";
import { signOut } from "firebase/auth";
import { auth, database } from "../../config/firebaseConfig";
import { ref, onValue, orderByChild, update, set, query } from "firebase/database";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const MessageBox = () => {
  const { currentUser } = useContext(AuthContext);
  const params = useParams();

  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatUsername, setChatUsername] = useState("");

  const userID = params.userID;

  useEffect(() => {
    if (userID) {
      const UID = currentUser.uid;

      const chatsRef1 = ref(database, `chats/${userID}/${UID}`);
      const chatsQuery1 = query(chatsRef1, orderByChild("createdAt"));

      onValue(chatsQuery1, (snapshot) => {
        const msgs: Message[] = [];
        snapshot.forEach((childSnapshot) => {
          msgs.push(childSnapshot.val());
        });
        setMessages(msgs);
      });

      const chatsRef2 = ref(database, `chats/${UID}/${userID}`);
      onValue(chatsRef2, (snapshot) => {
        snapshot.forEach((child) => {
          if (child.val().messageStatus !== 2) {
            const messageID = child.key;
            const updateRef = ref(database, `chats/${UID}/${userID}/${messageID}`);
            update(updateRef, { messageStatus: 2 }).catch(alert);
          }
        });
      });

      const usersRef = ref(database, `users/${userID}`);
      onValue(usersRef, (snapshot) => {
        setChatUsername(snapshot.val().online.displayName);
      });
    }
  }, [userID]);

  const sendMessage = () => {
    const messageID = uuidv4();

    if (currentMessage !== "") {
      const { uid, displayName } = currentUser;
      const chatsRef1 = ref(database, `chats/${uid}/${userID}/${messageID}`);
      const chatsRef2 = ref(database, `chats/${userID}/${uid}/${messageID}`);

      set(chatsRef1, {
        text: currentMessage,
        senderID: uid,
        senderName: displayName,
        createdAt: {
          ".sv": "timestamp",
        },
      }).catch(alert);

      set(chatsRef2, {
        text: currentMessage,
        messageStatus: 0,
        senderID: uid,
        senderName: displayName,
        createdAt: {
          ".sv": "timestamp",
        },
      }).catch(alert);

      setCurrentMessage("");
    } else {
      alert("Please enter a message");
      return;
    }
  };

  return (
    <div className="h-full w-3/4 bg-[url('/public/chat-wallpaper.jpg')] relative">
      <div className="h-[10%] w-full bg-gray-100 p-3 flex justify-between items-center">
        <p className="font-bold text-lg">{chatUsername}</p>
        <div className="flex items-center">
          <p className="text-lg mr-6">Hi, {currentUser.displayName}</p>
          <PrimaryButton
            text="Logout"
            size="medium"
            handleClick={async () => {
              const usersRef = ref(database, `users/${currentUser.uid}/online`);
              set(usersRef, {
                displayName: currentUser.displayName,
                online: false,
              });
              signOut(auth);
            }}
          />
        </div>
      </div>
      <div className="h-[75%] overflow-auto">
        {messages.map((message) => (
          <MessageItem key={message.createdAt} message={message} />
        ))}
      </div>
      <div className="bg-gray-300 w-full p-3 flex justify-between absolute bottom-0">
        <textarea
          placeholder="Write a message...."
          className="bg-white rounded-md p-3 w-full mr-3"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        ></textarea>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
