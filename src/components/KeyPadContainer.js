import React from "react";
import ButtonContainer from "./ButtonContainer";
import EnterClearContainer from "./EnterClearContainer";
import "../appCSS/key-pad-container.css";

class KeyPadContainer extends React.Component {
    render(){
        return(
            <div className={"login"}>
                <h1 className={"login__title"}>Restaurant Login</h1>
                <div className="login__content">
                    <div className={"login__details"}>
                        <label htmlFor="empId">User Id</label>
                        <input
                            className={"login__id"}
                            id="empId"
                            type="text"
                            placeholder="Emp Id"
                        />
                        <label htmlFor="empPin">Pin</label>
                        <input
                            className={"login__pin"}
                            id="empPin"
                            type="password"
                            placeholder="Emp PIN"
                        />
                    </div>
                    <div className={"keypad-buttons"}>
                        <ButtonContainer />
                        <EnterClearContainer />
                    </div>
                </div>
            </div>
        )
    }
}
export default KeyPadContainer