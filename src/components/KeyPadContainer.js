import React from "react";
import ButtonContainer from "./ButtonContainer";
import EnterClearContainer from "./EnterClearContainer";
import "../appCSS/key-pad-container.css";

// firebase
//import * as firebase from 'firebase';

import firebase from 'firebase/app';
import 'firebase/firestore';
//import { collection, query, where } from "firebase/firestore";
//import 'firebase/auth';
//import 'firebase/analytics';

//import { useAuthState } from 'react-firebase-hooks/auth';
//import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDfcxJYmzZFj1C8RWTUaDWEpR3njO6-Knc",
    authDomain: "rmoa-77360.firebaseapp.com",
    projectId: "rmoa-77360",
    storageBucket: "rmoa-77360.appspot.com",
    messagingSenderId: "382803345424",
    appId: "1:382803345424:web:bf7889d15373f26c944a95",
    measurementId: "G-7HS8R7V1YV"
};


if (!firebase.apps.length) {
    firebase.initializeApp({firebaseConfig});
}else {
    firebase.app(); // if already initialized, use that one
}

//const auth = firebase.auth();
const firestore = firebase.firestore();
//const analytics = firebase.analytics();


class KeyPadContainer extends React.Component {
    state ={
        pin: "",
        pinLength: 0 // for some reason "str.length" was returning undefined before
    }

    handleButtonClick = (button) => {
        if(this.state.pinLength < 4) {
            this.setState({
                pin: this.state.pin + button,
                pinLength: this.state.pinLength + 1
            })
        } else {
            alert("Too many digits for a pin length: " + this.state.pinLength)
        }
    }

    handleClearClick = () => {
        this.setState({
            pin: "",
            pinLength: 0
        })
    }

    handleSubmitClick = () => {
        // Query database -> login or fail msg
        const userRef = firestore.collection('users')
        //const userLoggedIn = useCollectionData(userRef, { pin: this.state.pin })
        const userLoggedIn = firebase.firestore.query(userRef, firebase.where("pin", "==", this.state.pin))

        if(userLoggedIn != null) {
            alert('logged in')
        } else {
            alert('not logged in')
        }
    }


    render(){
        return(
            <div className={"login"}>
                <h1 className={"login__title"}>Restaurant Login</h1>
                <div className="login__content">
                    <div className={"login__details"}>
                        <label htmlFor="empPin">Pin</label>
                        <input
                            className={"login__pin"}
                            id="empPin"
                            type="password"
                            value={this.state.pin}
                        />
                    </div>
                    <div className={"keypad-buttons"}>
                        <ButtonContainer
                            handleButtonClick={this.handleButtonClick}
                        />
                        <EnterClearContainer
                            handleClearClick={this.handleClearClick}
                            handleSubmitClick={this.handleSubmitClick}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default KeyPadContainer