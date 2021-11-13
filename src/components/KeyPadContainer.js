import React from "react";
import ButtonContainer from "./ButtonContainer";
import EnterClearContainer from "./EnterClearContainer";
import "../appCSS/key-pad-container.css";

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