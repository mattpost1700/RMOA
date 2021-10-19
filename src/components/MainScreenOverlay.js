import React from "react";

import SideBar from "./SideBar";
import TopBar from "./TopBar";
import "../appCSS/main-screen-overlay.css";
class MainScreenOverlay extends React.Component{
    state ={
        topBarTitle: "TopBar Title",
        userID: "90210",
        userClass: "Server",
    }
    render(){
        return(
            <div id="mainContainer" className={"main"}>
                <div id="topBarContainer" className={"main__top"}>
                        <TopBar 
                        topBarTitleProps={this.state.topBarTitle}
                        userIDProps={this.state.userID}
                        userClassProps={this.state.userClass}
                        />
                    </div>
                <div id="sideBarContainer" className={"main__side"}>
                    <SideBar />
                </div>
                <div id="mainContentContainer" className={"main__content"}>MainContent</div>
            </div>
        )
    }

}
export default MainScreenOverlay