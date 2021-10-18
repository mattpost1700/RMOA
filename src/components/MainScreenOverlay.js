import React from "react";

import SideBar from "./SideBar";
import TopBar from "./TopBar";
class MainScreenOverlay extends React.Component{
    state ={
        topBarTitle: "TopBar Title",
        userID: "90210",
        userClass: "Server",
    }
    render(){
        return(
            <div id="mainContainer"
                style={{
                    position: "absolute",
                    border: "solid 1px",
                    height: "600px",
                    width: "800px"
                }}>
                <div id="topBarContainer"
                    style={{
                        position: "absolute",
                        border: "solid 1px",
                        height: "150px",
                        width: "800px"
                    }}>
                        <TopBar 
                        topBarTitleProps={this.state.topBarTitle}
                        userIDProps={this.state.userID}
                        userClassProps={this.state.userClass}
                        />
                    </div>
                <div id="sideBarContainer"
                    style={{
                        position: "absolute",
                        border: "solid 1px",
                        top: "150px",
                        height: "450px",
                        width: "100px"

                    }}
                >
                    <SideBar />
                </div>
                <div id="mainContentContainer"
                    style={{
                        position: "absolute",
                        border: "solid 1px",
                        top: "150px",
                        left: "100px",
                        height: "450px",
                        width: "700px"
                    }}
                >MainContent</div>
            </div>
        )
    }

}
export default MainScreenOverlay