import React from "react";

import "../appCSS/top-bar.css";

class TopBar extends React.Component{
    render(){
        return(
            <div className={"topbar"}>
                <div id="leftPart" className={"topbar__left"}>
                    <p className={"topbar__left-text"}>{this.props.topBarTitleProps}</p>
                    <button className={"topbar__left-back"}>&#60;&#60; Back</button>
                </div>
                <div className="topbar__wrapper">
                <div id="middlePart" className={"topbar__middle"}>
                    <p className={"topbar__middle-text"}>UserID: <span>{this.props.userIDProps}</span></p>

                    <p className={"topbar__middle-text"}>UserClass: <span>{this.props.userClassProps}</span></p>

                </div>
                <div id="rightPart" className={"topbar__right"}>
                        <p className={"topbar__right-text"}>Date/Time</p>
                        <button className={"topbar__right-button"}>Logout</button>
                </div>
                </div>
            </div>
        )
    }
}
export default TopBar