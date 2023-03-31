import { createContext } from "react";
import { FirebaseApp } from "firebase/app";

const FirebaseContext = createContext<FirebaseApp | null>(null);

export default FirebaseContext;
