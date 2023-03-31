import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { Container } from "../components/common/Container";
import { User } from "../types/users";

interface IUserState extends User {
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState<IUserState>({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { displayName, email, password, confirmPassword } = user;

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(res.user, {
          displayName,
        });

        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
        });

        await setDoc(doc(db, "userChats", res.user.uid), {});

        navigate("/");
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  return (
    <Container>
      <div className="h-screen flex items-center justify-center bg-gray-300">
        <div className="w-1/2 p-6 flex flex-col items-center mt-12">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-6 shadow-2xl h-auto w-1/2 mt-12 flex flex-col items-center justify-between"
          >
            <h1 className="text-primary font-bold text-3xl">Register</h1>
            <input
              name="displayName"
              type="text"
              className="rounded-md p-3 w-full my-6 border-2 border-gray-400"
              placeholder="Enter name"
              value={user.displayName}
              onChange={onChange}
            />
            <input
              name="email"
              type="email"
              className="rounded-md p-3 w-full my-6 border-2 border-gray-400"
              placeholder="Enter email"
              value={user.email}
              onChange={onChange}
            />
            <input
              name="password"
              type="password"
              className="rounded-md p-3 w-full my-6 border-2 border-gray-400"
              placeholder="Password"
              value={user.password}
              onChange={onChange}
            />
            <input
              name="confirmPassword"
              type="password"
              className="rounded-md p-3 w-full my-6 border-2 border-gray-400"
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChange={onChange}
            />
            <button
              type="submit"
              className={`transition-all ease-in p-2 w-64 text-white my-3 text-sm rounded font-bold bg-primary hover:opacity-80`}
            >
              Sign up
            </button>

            <p className="text-primary">or</p>
            <Link to="/login">
              <p className="text-primary font-bold cursor-pointer transition-all ease-in hover:border-b-2 hover:border-primary">
                Login
              </p>
            </Link>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default RegisterPage;
