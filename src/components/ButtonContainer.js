import React from "react";
import KeyPadButton from "./KeyPadButton";
import "../appCSS/button-container.css";
class ButtonContainer extends React.Component{
    render(){
        return(
        <div className={"keypad"}>
            <div className="keypad__button">
                <KeyPadButton
                    handleButtonClick={this.props.handleButtonClick}
                    label={7}
                />
            </div>
            <div className="keypad__button">
                <KeyPadButton
                    handleButtonClick={this.props.handleButtonClick}
                    label={8}
                />
            </div>
            <div className="keypad__button">
                <KeyPadButton
                    handleButtonClick={this.props.handleButtonClick}
                    label={9}
                />
            </div>
            <div className="keypad__button">
                <KeyPadButton
                    handleButtonClick={this.props.handleButtonClick}
                    label={4}
                />
            </div>
            <div className="keypad__button">
                <KeyPadButton
                    handleButtonClick={this.props.handleButtonClick}
                    label={5}
                />
            </div>
            <div className="keypad__button">
                <KeyPadButton
                    handleButtonClick={this.props.handleButtonClick}
                    label={6}
                />
            </div>
            <div className="keypad__button">
                <KeyPadButton
                    handleButtonClick={this.props.handleButtonClick}
                    label={1}
                />
            </div>
            <div className="keypad__button">
                <KeyPadButton
                    handleButtonClick={this.props.handleButtonClick}
                    label={2}
                />
            </div>
            <div className="keypad__button">
                <KeyPadButton
                    handleButtonClick={this.props.handleButtonClick}
                    label={3}
                />
            </div>
            <div className="keypad__button">
                <KeyPadButton
                    handleButtonClick={this.props.handleButtonClick}
                    label={0}
                />
            </div>

        </div>
        )
    }
}
export default ButtonContainer