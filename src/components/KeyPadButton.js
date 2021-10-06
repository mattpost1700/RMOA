import React from "react";

class KeyPadButton extends React.Component{
    
    render(){
        return(
            <div>
                <button 
                id={this.props.label}
                >{this.props.label}</button>
            </div>
        )
    }
}
export default KeyPadButton