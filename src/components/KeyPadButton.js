import React from "react";
import "../appCSS/key-pad-button.css";

class KeyPadButton extends React.Component{
    
    render(){
        return(
            <div className={"keypad-button"}>
                <button className={"keypad-button__button"}
                id={this.props.label}
                >{this.props.label}</button>
            </div>
        )
    }
}
export default KeyPadButton