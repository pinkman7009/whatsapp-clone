import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../config/firebaseConfig";
import { onDisconnect, onValue, ref, set } from "firebase/database";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChangeToDeliveredStatus = (userID: string) => {
    onValue(ref(database, ".info/connected"), (snapshot) => {
      if (snapshot.val()) {
        onValue(ref(database, `chats/${userID}`), (sender) => {
          console.log({ sender });
          sender.forEach((s) => {
            onValue(ref(database, `chats/${userID}/${s.key}`), (messages) => {
              messages.forEach((msg) => {
                if (msg.val().messageStatus == 0) {
                  const data = msg.val();
                  const messageID = msg.key;
                  const updateRef = ref(database, `chats/${userID}/${s.key}/${messageID}`);
                  set(updateRef, {
                    messageStatus: 1,
                    createdAt: data.createdAt,
                    senderName: data.senderName,
                    senderID: data.senderID,
                    text: data.text,
                  }).catch(alert);
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

      handleChangeToDeliveredStatus(res.user.uid);

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
