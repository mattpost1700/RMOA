import React from "react";
import "../appCSS/sidebar-button.css"

class SideBarButton extends React.Component{

    buttonClick = () => {
        // let buttons = document.getElementsByClassName("sidebar-button");
        // for(let i = 0; i < buttons.length; i++){
        //     buttons[i].onclick = function() {
        //         if(!buttons[i].classList.contains("active")){
        //             for(let j = 0; j < buttons.length; j++) {
        //                 buttons[j].classList.remove("active");
        //             }
        //             buttons[i].classList.add("active");
        //         }
        //      }
        // }

    }

    componentDidMount() {
        this.buttonClick();
    }

    render(){

        return(
            <button className={(this.props.optionProps.active) ? "sidebar-button active" : "sidebar-button"}
            onClick={() => this.props.handleSideBarClickProps(this.props.optionProps.id)}
            >{this.props.optionProps.title}</button>
        )
    }
}
export default SideBarButton