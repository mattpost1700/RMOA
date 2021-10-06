import React from "react";
import ButtonContainer from "./ButtonContainer";
import EnterClearContainer from "./EnterClearContainer";

class KeyPadContainer extends React.Component {
    render(){
        return(
            <div
            style={{
                display: "block",
                width: "500px",
                align: "center",
                border: "1px solid"
                
            }}
            id="parent_container"
            >
                <h1>Restaurant Login</h1>  
                <div
                style={{
                    display: "flex",
                    flexDirection: "column"
                }}
                >
                    <input
                    id="empId"
                    type="text"
                    placeholder="Emp Id"
                    ></input>
                    <input
                    id="empPin"
                    type="password"
                    placeholder="Emp PIN"
                    ></input>
                </div>
                <div
                style={{
                    display: "flex",
                    flexDirection: "row"
                }}
                >
                    <ButtonContainer />
                    <EnterClearContainer />
                </div>
            </div>
        )
    }
}
export default KeyPadContainer