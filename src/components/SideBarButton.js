import React from "react";

class SideBarButton extends React.Component{
    render(){
        return(
            <button 
            onClick={() => this.props.handleSideBarClickProps(this.props.optionProps.id)}
            >{this.props.optionProps.title}</button>
        )
    }
}
export default SideBarButton