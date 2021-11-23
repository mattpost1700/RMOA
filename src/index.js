import React from "react";
import reactDOM from "react-dom";
import "./index.css";
import KeyPadContainer from "./components/KeyPadContainer";

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDfcxJYmzZFj1C8RWTUaDWEpR3njO6-Knc",
    authDomain: "rmoa-77360.firebaseapp.com",
    projectId: "rmoa-77360",
    storageBucket: "rmoa-77360.appspot.com",
    messagingSenderId: "382803345424",
    appId: "1:382803345424:web:bf7889d15373f26c944a95",
    measurementId: "G-7HS8R7V1YV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

reactDOM.render(
    <React.StrictMode>
        <KeyPadContainer dbProps={db}/>
    </React.StrictMode>,
    document.getElementById("root")
)