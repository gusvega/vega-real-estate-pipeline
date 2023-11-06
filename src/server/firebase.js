import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config";
import { getDatabase } from "firebase/database";
import {
    getAuth, createUserWithEmailAndPassword,
    fetchSignInMethodsForEmail,
    signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, collection, setDoc, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const firestoreDB = getFirestore(app)

export { firestoreDB, collection, setDoc, addDoc, doc, getDoc, updateDoc, auth, fetchSignInMethodsForEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword };
