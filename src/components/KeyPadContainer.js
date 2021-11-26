import React from "react";
import ButtonContainer from "./ButtonContainer";
import EnterClearContainer from "./EnterClearContainer";
import "../appCSS/key-pad-container.css";

import MainScreenOverlay from "./MainScreenOverlay";
import { Router, Route, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import {collection, getDocs, query, where} from 'firebase/firestore';

/**
 * The log in screen with the pin pad container
 */
class KeyPadContainer extends React.Component {
    /**
     * The pin number state
     * @type {{pin: string, pinLength: number}}
     */
    state = {
        pin: "",
        pinLength: 0 // for some reason "str.length" was returning undefined before
    }

    /**
     * The action when the a keypad button is clicked
     * @param button The UI reference to the js button
     */
    handleButtonClick = (button) => {
        if (this.state.pinLength < 4) {
            this.setState({
                pin: this.state.pin + button,
                pinLength: this.state.pinLength + 1
            })
        } else {
            alert("Too many digits for a pin length: " + this.state.pinLength)
        }
    }

    /**
     * The action when the "Clear" button is clicked
     */
    handleClearClick = () => {
        this.setState({
            pin: "",
            pinLength: 0
        })
    }

    /**
     * The action when the "Submit" button is clicked
     * @returns {Promise<void>}
     */
    handleSubmitClick = async () => {
        console.log("handleSubmitClick", ": ", "started")
        const q = query(collection(this.props.dbProps, "users"), where("pin", "==", this.state.pin))
        let loggedIn = false

        console.log("handleSubmitClick", ": ", "starting query (pin = " + this.state.pin + ")...")
        let querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            // Logged in!
            loggedIn = true
            const fName = doc.get('first_name')
            const lName = doc.get('last_name')
            const position = doc.get('position')

            console.log("handleSubmitClick", ": ", fName + " " + lName, "logged in")

            // TODO: Add routing to respective screens shown in ($...)
            const navigate = useNavigate();
            switch (position) {
                case 'server':
                    // Go to main screen ($MainScreenOverlay)
                    console.log("handleSubmitClick", ": ", "Going to server view...");
                    navigate("/MainScreenOverlay")
                    break;
                case 'manager':
                    // Go to manager screen ($MainScreenOverlay)
                    break;
                case 'host':
                    // Go to host screen ($MainScreenOverlay)
                    break;
                case 'kitchen':
                    // Gp to kitchen view ($'KitchenOverlay') NOT CREATED YET
                    break;
            }
        });

        // reset text box
        this.setState({
            pin: "",
            pinLength: 0
        })

        // check if logged in
        if (!loggedIn) {
            console.log("handleSubmitClick", ": ", "PIN does not match any user");
        }
    }

    /**
     * Renders the page
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div className={"login"}>
                <h1 className={"login__title"}>Restaurant Login</h1>
                <div className="login__content">
                    <div className={"login__details"}>
                        <label htmlFor="empPin">Pin</label>
                        <input readOnly
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