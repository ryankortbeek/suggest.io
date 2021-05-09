import React from "react";
import firebase from "firebase/app";

// code taken from https://medium.com/geekculture/firebase-auth-with-react-and-typescript-abeebcd7940a
export const AuthContext = React.createContext<firebase.User | null>(null);