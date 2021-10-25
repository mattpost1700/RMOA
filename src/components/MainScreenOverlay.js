import React from "react";

import SideBar from "./SideBar";
import TopBar from "./TopBar";
import SeatingChart from "./mainContentContainer/SeatingChart";
import OptionScreen from "./mainContentContainer/OptionScreen";
import "../appCSS/main-screen-overlay.css";
class MainScreenOverlay extends React.Component{
    //This information should be mapped to the current user   
    state ={
        lastOrderIDGenerated: 1000,
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
                currentOrder: 0
            }
        ],
        orders:[
            {
                orderID: 1000,
                parentTableID: 0,
                paid: false,
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
    //**************************************************************** */
    //SeatingChart methods for tables

    // Gets the associated order from a table
    // If order is not found, create a new order
    // and set it as this tables order
    getOrder = (mTable) =>{
        for(let p_order in this.state.orders){
            if(mTable.TableID === p_order.parentTableID){
                return p_order;
            }
        }
        //If we found no associated order
        let newOrderID = this.state.lastOrderIDGenerated + 1;
        this.setState({lastOrderIDGenerated: newOrderID});
        for(let i = 0 ; i < this.state.tables.length; i++){
            if(mTable.TableID === this.state.tables[i].TableID){
                let pTables = [...this.state.tables];
                let pTable = {...pTables[i]};
                pTable.currentOrder = newOrderID;
                pTables[i] = pTable;
                this.setState({tables: pTables})
            }
        }
        return({
            orderID: newOrderID,
            parentTableID: mTable.TableID,
            paid: false,
            items: []
        })
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