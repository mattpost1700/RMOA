import React from "react";

class EnterClearContainer extends React.Component{
    render(){
        return (
        <div
        style={{
            display: "flex",
            flexDirection: "column"
        }}
        >
            <button
            id="enterbutton"
            >Enter</button>
            <button
            id="clearbutton"
            >Clear</button>
        </div>
        )
    }
}
export default EnterClearContainer