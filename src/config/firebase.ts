import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAvknl4WAgnN53w-QTN5L2Fa1hmEG7JSl8",
    authDomain: "movie-explorer-52492.firebaseapp.com",
    projectId: "movie-explorer-52492",
    storageBucket: "movie-explorer-52492.firebasestorage.app",
    messagingSenderId: "764461548265",
    appId: "1:764461548265:web:0d56d8d0770cbab52a2678",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


