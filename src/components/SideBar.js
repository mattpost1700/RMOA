import React from "react";

import "../appCSS/side-bar.css";

class SideBar extends React.Component{
    render(){
        return(
            
            <ul className={"sidebar"}
            id="sideBarList">
                <li className={"sidebar__item"}>Menu #1</li>
                <li className={"sidebar__item"}>Menu #2</li>
                <li className={"sidebar__item"}>Menu #3</li>
                <li className={"sidebar__item"}>Menu #4</li>
                <li className={"sidebar__item"}>Menu #5</li>
            </ul>
        )
    }
}
export default SideBar