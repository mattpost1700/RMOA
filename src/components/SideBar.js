import React from "react";

import "../appCSS/side-bar.css";
import SideBarButton from "./SideBarButton";
class SideBar extends React.Component{
    render(){

        return(
            
            <ul className={"sidebar"}
            id="sideBarList">{
                this.props.sideBarOptionsProps.map(option =>(
                    <li className={"sidebar__item"}>
                        <SideBarButton 
                        optionProps={option} 
                        handleMainContentProps={this.props.handleMainContentProps}
                        />
                    </li> 
                ))
            }
            </ul>
        )
    }
}
export default SideBar