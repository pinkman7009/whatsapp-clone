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
  const [roomID, setRoomID] = useState("");
  const [chatUsername, setChatUsername] = useState("");

  const userID = params.userID;

  const getExistingChatID = (userID) => {
    const { uid } = currentUser;
    const queryRef = ref(database, "chats");

    // queryRef.once()
  };
  const createNewChat = (user1ID, user2ID) => {
    const roomID = uuidv4();

    const chatRef = ref(database, `chats/${roomID}/participants`);
    set(chatRef, {
      [user1ID]: true,
      [user2ID]: true,
      createdAt: serverTimestamp(),
    })
      .then(() => {
        console.log("new chat created");
      })
      .catch((error) => {
        console.log("error");
      });

    console.log({ chatRef });

    return roomID;
  };

  const sendMessage = () => {
    const messageRef = ref(database, `/chats/${roomID}/messages`);

    set(messageRef, {
      sender: currentUser.uid,
      message: currentMessage,
      createdAt: serverTimestamp(),
    });
  };

  const getChatHistory = (roomID) => {
    const messageRef = ref(database, "chats/" + roomID + "/messages", orderByValue("createdAt"));

    let messageList = [];
    onValue(messageRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        messageList.push({
          id: childSnapshot.key,
          sender: childSnapshot.val().sender,
          message: childSnapshot.val().message,
          createdAt: childSnapshot.val().createdAt,
        });
      });
      console.log({ messageList });
      setMessages(messageList);
    });
  };

  const getExistingRoomID = (user1ID, user2ID) => {
    console.log({ user1ID, user2ID });
    const chatsRef = ref(database, `chats/participants/${user1ID}`);
    const chatsQuery = query(chatsRef, orderByValue("createdAt"), equalTo(true));

    return get(chatsQuery).then((snapshot) => {
      console.log({ snapshot });
      let roomID = null;
      snapshot.forEach((chatSnapshot) => {
        const participants = chatSnapshot.val().participants;
        console.log("hi");
        console.log({ participants });
        if (participants[user2ID]) {
          roomId = chatSnapshot.key;
        }
      });

      console.log({ roomID });
      return roomID;
    });
  };

  useEffect(() => {
    if (currentUser.uid && userID) {
      console.log(currentUser.uid, userID);
      const existingRoomID = getExistingRoomID(currentUser.uid, userID);

      if (existingRoomID) {
        getChatHistory(existingRoomID);
        setRoomID(existingRoomID);
      } else {
        const newRoomID = createNewChat(currentUser.uid, userID);
        setRoomID(newRoomID);
      }
    }
  }, [currentUser.uid, userID]);

  // useEffect(() => {
  //   if (userID) {
  //     const UID = currentUser.uid;

  //     const chatref = query(ref(database, `chats/${userID}/${UID}`), orderByChild("createdAt"));
  //     onValue(chatref, (snapshot) => {
  //       let messageList = [];
  //       snapshot.forEach((childSnapshot) => {
  //         messageList.push(childSnapshot.val());
  //       });
  //       console.log({ messageList });
  //       setMessages(messageList);
  //     });

  //     const chatref2 = ref(database, `/chats/${UID}/${userID}`);
  //     onValue(chatref2, (snapshot) => {
  //       snapshot.forEach((child) => {
  //         if (child.val().messageInfo != 2) {
  //           const reference = ref(database, `chats/${UID}/${userID}/${child.key}`);
  //           update(reference, { messageInfo: 2 });
  //         }
  //       });
  //     });

  //     const ref3 = ref(database, `/users/${userID}`);

  //     onValue(ref3, (snapshot) => {
  //       setChatUsername(snapshot.val().name);
  //     });
  //   }
  // }, []);

  // const sendMessage = () => {
  //   if (currentMessage !== "") {
  //     const { uid, displayName } = currentUser;

  //     set(ref(database, `/chats/${userID}/${uid}/${roomID}`), {
  //       text: currentMessage,
  //       senderID: uid,
  //       senderName: displayName,
  //       messageInfo: 0,
  //       createdAt: serverTimestamp(),
  //     });

  //     setCurrentMessage("");
  //   } else {
  //     alert("Enter a message");
  //     return;
  //   }
  // };

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
      <div className="h-[75%]">
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
