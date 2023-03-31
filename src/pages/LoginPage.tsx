import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, database } from "../config/firebaseConfig";
import { onDisconnect, onValue, ref, set } from "firebase/database";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const changeMsgStatusToDeliver = (userID) => {
    const dbRef = ref(database, ".info/connected");
    onValue(dbRef, (snapshot) => {
      if (snapshot.val()) {
        const ref2 = ref(database, `chats/${userID}`);
        onvalue(ref2, (sender) => {
          sender.forEach((s) => {
            database.ref(`chats/${userID}/${s.key}`).on("value", (messages) => {
              messages.forEach((msg) => {
                if (msg.val().messageInfo == 0) {
                  const data = msg.val();
                  database.ref(`chats/${userID}/${s.key}/${msg.key}`).set({
                    createdAt: data.createdAt,
                    senderName: data.senderName,
                    senderID: data.senderID,
                    text: data.text,
                    messageInfo: 1,
                  });
                }
              });
            });
          });
        });
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      const onlineStatusRef = ref(database, ".info/connected");

      onValue(onlineStatusRef, (snapshot) => {
        if (snapshot.val()) {
          const userOnlineStatusRef = ref(database, "users/" + res.user.uid + "/online");
          set(userOnlineStatusRef, {
            displayName: res.user.displayName,
            online: true,
          });
          onDisconnect(userOnlineStatusRef).set({
            displayName: res.user.displayName,
            online: false,
          });
        }
      });
      // const dbRef = ref(database, `users/${res.user.uid}`);
      // set(dbRef, { name: res.user.displayName, onlineStatus: true });

      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-300">
      <div className="w-1/2 p-6 flex flex-col items-center mt-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-6 shadow-2xl h-[500px] w-1/2 mt-12 flex flex-col items-center justify-between"
        >
          <h1 className="text-primary font-bold text-3xl">Sign In</h1>
          <input
            name="email"
            type="email"
            className="rounded-md p-3 w-full my-6 border-2 border-gray-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            type="password"
            className="rounded-md p-3 w-full my-6 border-2 border-gray-400"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className={`transition-all ease-in p-2 w-64 text-white my-3 text-sm rounded font-bold bg-primary hover:opacity-80`}
          >
            Log In
          </button>
          <p className="text-primary">or</p>
          <Link to="/register">
            <p className="text-primary font-bold cursor-pointer transition-all ease-in hover:border-b-2 hover:border-primary">
              Register
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
