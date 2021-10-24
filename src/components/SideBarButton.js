import React from "react";

class SideBarButton extends React.Component{
    render(){
        return(
            <button 
            onClick={() => this.props.handleMainContentProps(this.props.optionProps.id)}
            >{this.props.optionProps.title}</button>
        )
    }
}
export default SideBarButton