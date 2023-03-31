import { useState, useEffect, useContext } from "react";
import { PrimaryButton } from "../common/Buttons";
import { MessageItem } from "./MessageItem";

import { AuthContext } from "../../context/auth";
import { signOut } from "firebase/auth";
import { auth, db, database } from "../../config/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import {
  ref,
  onValue,
  orderByChild,
  update,
  set,
  serverTimestamp,
  query,
  equalTo,
  get,
  orderByValue,
} from "firebase/database";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const MessageBox = () => {
  const { currentUser } = useContext(AuthContext);
  const params = useParams();

  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatUsername, setChatUsername] = useState("");

  const userID = params.userID;

  const changeMsgStatusToReceived = (userID) => {
    onValue(ref(database, ".info/connected"), (snapshot) => {
      if (snapshot.val()) {
        onValue(ref(database, `chats/${userID}`), (sender) => {
          console.log({ sender });
          sender.forEach((s) => {
            onValue(ref(database, `chats/${userID}/${s.key}`), (messages) => {
              messages.forEach((msg) => {
                if (msg.val().messageInfo !== 2) {
                  const data = msg.val();
                  const messageID = msg.key;
                  const updateRef = ref(database, `chats/${userID}/${s.key}/${messageID}`);
                  set(updateRef, {
                    createdAt: data.createdAt,
                    senderName: data.senderName,
                    senderID: data.senderID,
                    text: data.text,
                    messageInfo: 2,
                  }).catch(alert);
                }
              });
            });
          });
        });
      }
    });
  };

  useEffect(() => {
    if (userID) {
      const UID = currentUser.uid;

      const chatsRef1 = ref(database, `chats/${userID}/${UID}`);
      const chatsQuery1 = query(chatsRef1, orderByChild("createdAt"));

      onValue(chatsQuery1, (snapshot) => {
        const msgs = [];
        snapshot.forEach((childSnapshot) => {
          msgs.push(childSnapshot.val());
        });
        console.log({ msgs });
        setMessages(msgs);
      });

      const chatsRef2 = ref(database, `chats/${UID}/${userID}`);
      onValue(chatsRef2, (snapshot) => {
        snapshot.forEach((child) => {
          let updatedMessageInfoValue;
          console.log(child.val());
          if (child.val().messageInfo !== 2) {
            const messageID = child.key;
            const updateRef = ref(database, `chats/${UID}/${userID}/${messageID}`);
            update(updateRef, { messageInfo: 2 }).catch(alert);
          }
        });
      });

      // changeMsgStatusToReceived(currentUser.uid);

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
        messageInfo: 0,
        senderID: uid,
        senderName: displayName,
        createdAt: {
          ".sv": "timestamp",
        },
      }).catch(alert);

      setCurrentMessage("");
    } else {
      alert("Enter a message");
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
          <MessageItem message={message} />
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
