import React from "react";
import KeyPadButton from "./KeyPadButton";
import "../appCSS/button-container.css";
class ButtonContainer extends React.Component{
    render(){
        return(
        <div className={"keypad"}>
            <div className="keypad__button">
                <KeyPadButton label={7}/>
            </div>
            <div className="keypad__button">
                <KeyPadButton label={8}/>
            </div>
            <div className="keypad__button">
                <KeyPadButton label={9}/>
            </div>
            <div className="keypad__button">
                <KeyPadButton label={4}/>
            </div>
            <div className="keypad__button">
                <KeyPadButton label={5}/>
            </div>
            <div className="keypad__button">
                <KeyPadButton label={6}/>
            </div>
            <div className="keypad__button">
                <KeyPadButton label={1}/>
            </div>
            <div className="keypad__button">
                <KeyPadButton label={2}/>
            </div>
            <div className="keypad__button">
                <KeyPadButton label={3}/>
            </div>
            <div className="keypad__button">
                <KeyPadButton label={0}/>
            </div>

        </div>
        )
    }
}
export default ButtonContainer