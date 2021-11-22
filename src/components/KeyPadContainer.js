import React from "react";
import ButtonContainer from "./ButtonContainer";
import EnterClearContainer from "./EnterClearContainer";
import "../appCSS/key-pad-container.css";


import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where} from 'firebase/firestore';



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
        //Query database -> login or fail msg
        //const q = query(collection(firestore, "users"), where("pin", "==", this.state.pin));
        //const userRef = collection(db,'users');
        const q = query(collection(db, "users"), where("pin", "==", this.state.pin));
        //const userLoggedIn = useCollectionData(userRef, { pin: this.state.pin })
        // const userLoggedIn = query(userRef, where("pin", "==", this.state.pin))
        let querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            });
        console.log("q", q);
        if(q !== "1234") {
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