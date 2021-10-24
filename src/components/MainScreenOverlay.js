import React from "react";

import SideBar from "./SideBar";
import TopBar from "./TopBar";
import SeatingChart from "./SeatingChart";
import OptionScreen from "./OptionScreen";
import "../appCSS/main-screen-overlay.css";
class MainScreenOverlay extends React.Component{
    state ={
        topBarTitle: "TopBar Title",
        userID: "90210",
        userClass: "Server",
        sideBarOptions: [
            {
                id: 1,
                title: "Seating Chart",
                component: SeatingChart
            },
            {
                id: 2,
                title: "Option #2",
                component: OptionScreen
            },
            {
                id: 3,
                title: "Option #3",
                component: OptionScreen
            },
            {
                id: 4,
                title: "Option #4",
                component: OptionScreen
            },
            {
                id: 5,
                title: "Option #5",
                component: OptionScreen
            }
        ],
        mainContent: SeatingChart,
    }
    handleMainContent = (m_id) =>{
        console.log(m_id);

        let sb = this.state.sideBarOptions;
        console.log(sb);
        // let newContent = sb.reduce((p_id, q_id) =>{
        //     console.log("q_id", q_id);
        //     if(p_id === q_id.id){
        //         return q_id.component;
        //     }
        // },m_id);
        let newContent;
        for(let i = 0; i < sb.length; i++){
            if(m_id === sb[i].id){
                newContent = sb[i].component;
            }
        }
        console.log("newContent",newContent);
        this.setState({
            mainContent: newContent
        })
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
                    <SideBar 
                    sideBarOptionsProps={this.state.sideBarOptions}
                    handleMainContentProps={this.handleMainContent}
                    />
                </div>
                <div id="mainContentContainer" className={"main__content"}>
                    <this.state.mainContent />
                </div>
            </div>
        )
    }

}
export default MainScreenOverlay