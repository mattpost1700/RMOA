import React from "react";

import SideBar from "./SideBar";
import TopBar from "./TopBar";
import SeatingChart from "./mainContentContainer/SeatingChart";
import OptionScreen from "./mainContentContainer/OptionScreen";
import "../appCSS/main-screen-overlay.css";
class MainScreenOverlay extends React.Component{
    //This information should be mapped to the current user
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

        mainContent: {
            name : "Seating Chart",
            component: SeatingChart,
        },

        tables: [
            {
                tableID: 1,
                status: "free",
                capacity: 4,
                currentOrder: 1
            }
        ],
        orders:[
            {
                orderID: 1,
                items: []
            }
        ]

    }
    handleSideBarClick = (m_id) =>{
        //console.log(m_id);

        let sb = this.state.sideBarOptions;
        //console.log(sb);
        
        let newContent = {
            name: "undefined",
            component: "undefined"
        };
        for(let i = 0; i < sb.length; i++){
            if(m_id === sb[i].id){
                newContent.name = sb[i].title;
                newContent.component = sb[i].component;              
            }
        }
        //console.log("newContent",newContent);
        this.setState({
            mainContent: newContent
        })
        //console.log("mainContent", this.state.mainContent);
    }

    // The idea behind this function is to dynamically create
    // the components we need for each with all the state
    // and function written in this class.

    // This is sort of like a Factory Method
    generateMainContentView = () =>{
        switch(this.state.mainContent.name){
            case "Seating Chart":{
                return (
                    <SeatingChart 
                    userIDProps={this.state.userID}
                    userClassProps={this.state.userClass}
                    tablesProps={this.state.tables}
                    ordersProps={this.state.orders}
                    />
                )
            }
            case "Order View":{
                return (
                    <p>I'm an order view</p>
                )
            }
            default :{
                return (
                    <p>Default View</p>
                )
            }
        }
    }
    
    render(){
        const mainContentView = this.generateMainContentView();
        //console.log("mainContentView",mainContentView);
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
                    handleSideBarClickProps={this.handleSideBarClick}
                    />
                </div>
                <div id="mainContentContainer" className={"main__content"}>
                    {mainContentView}
                </div>
            </div>
        )
    }

}
export default MainScreenOverlay