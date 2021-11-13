import React from "react";
import "../appCSS/enter-clear-container.css";

class EnterClearContainer extends React.Component {
    render() {
        return (
            <div className={"login-button"}>
                <button className={"login-button__button login-button__clear"}
                        id="clearbutton"
                        onClick={this.props.handleClearClick}
                >Clear
                </button>
                <button className={"login-button__button login-button__enter"}
                        id="enterbutton"
                        onClick={this.props.handleSubmitClick}
                >Enter
                </button>
            </div>
        )
    }
}

export default EnterClearContainer