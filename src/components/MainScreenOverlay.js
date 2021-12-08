import React from "react";

import SideBar from "./SideBar";
import TopBar from "./TopBar";
import SeatingChart from "./mainContentContainer/SeatingChart";
import OptionScreen from "./mainContentContainer/OptionScreen";
import OrderView from "./mainContentContainer/OrderView";
import Order from "./Order"
import MockOrder from "../testFiles/mockOrder";
import MockOrderLong from "../testFiles/mockOrderLong";
import MockOrderSmall from "../testFiles/mockOrderSmall";
import { collection, addDoc} from 'firebase/firestore';
import "../appCSS/main-screen-overlay.css";
class MainScreenOverlay extends React.Component{
    //This information should be mapped to the current user   
    state ={
        lastOrderIDGenerated: 1000,
        topBarTitle: "RMOA",
        userID: "90210",
        userClass: "Server",
        visited: [],
        currSideBarID: 1,
        sideBarOptions: [
            {
                id: 1,
                title: "Seating Chart",
                component: SeatingChart,
                active: true
            },
            {
                id: 2,
                title: "Option #2",
                component: OptionScreen,
                active: false
            },
            {
                id: 3,
                title: "Option #3",
                component: OptionScreen,
                active: false
            },
            {
                id: 4,
                title: "Option #4",
                component: OptionScreen,
                active: false
            },
            {
                id: 5,
                title: "Option #5",
                component: OptionScreen,
                active: false
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
                order: MockOrderLong,
            },
            {
                tableID: 2,
                status: "free",
                capacity: 4,
                order: MockOrderSmall,
            },
            {
                tableID: 3,
                status: "full",
                capacity: 4,
                order: undefined
            },
            {
                tableID: 4,
                status: "free",
                capacity: 4,
                order: undefined
            }
        ],
        //To pass down to an OrderView
        orderModel: 
        {
            tableID: 0,
            order: undefined
        }
    }
    generateNewOrderId = () =>{
        let newOrderID = this.state.lastOrderIDGenerated + 1;
        this.setState({lastOrderIDGenerated: newOrderID});
        return newOrderID;
    }
    handleSideBarClick = (m_id) =>{
        //console.log(m_id);
        this.addPageToStack(this.state.mainContent, m_id);


        let sb = this.state.sideBarOptions;
        //console.log(sb);
        
        let newContent = {
            name: "undefined",
            component: "undefined"
        };
        for(let i = 0; i < sb.length; i++){
            if(m_id === sb[i].id){
                //handle active state when menu item clicked
                sb.forEach(i => {
                    if(i.active) i.active = false;
                })
                sb[i].active = true;
                newContent.name = sb[i].title;
                newContent.component = sb[i].component;
                this.setState({sideBarOptions:sb})
            }
        }
        //console.log("newContent",newContent);
        this.setState({
            mainContent: newContent
        });
        //console.log("mainContent", this.state.mainContent);
    }


    handleBackClick = () => {
        let v = this.state.visited;
        if(v.length > 0) {
            let newContent = v.pop();
            this.setState({visited: v});
            this.setState({mainContent: newContent.content});
            let sb = this.state.sideBarOptions;
            sb.forEach(i => {
                i.active = false;
                if(i.id === newContent.id){
                    i.active = true;
                    this.setState({currSideBarID: i.id});
                }
            });
            this.setState({sideBarOptions: sb});

        }
    }


    //When going to a new page use this method to add pages to the back button stack
    //The first parameter takes the content of the page you are leaving {name:"", component:""}
    //the second parameter takes the SideBarOptions id of the page you are going to
    //if staying in the same tab you can leave out the id or set it to 0
    //this is the only method you need to call for the back button to function
    addPageToStack(content, newPageId = 0){
        let v = this.state.visited;

        v.push({content: content, id: this.state.currSideBarID});
        this.setState({visited: v});

        if (newPageId !== 0)
            this.setState({currSideBarID: newPageId});

    }

    //**************************************************************** */
    //SeatingChart methods for tables
    //
    
    // This method is passed as props
    // and setups the OrderView for an order model
    executeViewOrder = (mTable) =>{
        this.addPageToStack(this.state.mainContent);
        console.log("In excuteViewOrder");
        this.setModelForOrderView(mTable);
        this.setState({mainContent: {name: "Order View", component: OrderView}})
    }
    // Set the state to reflect the specific order to be
    // the model of the OrderView
    setModelForOrderView = (mTable) =>{
        console.log("In setModelForOrderView");
        console.log("mTable is ", mTable);
        let mOrder = mTable.order;
        if(mOrder === undefined){
            console.log("mOrder was undefined");
            mTable.order = new Order(this.generateNewOrderId());
            mOrder = mTable.order;
        }
        console.log("mOrder is ", mOrder);
        this.setState({orderModel: {tableID: mTable.tableID, order: mOrder}});
    }
    //************************************************************** */
    //OrderView methods
    //

    // Takes an array of tempOrderItems and updates the order
    // of the passed in tableID
    updateOrder = (mTableID, mTempOrderItems) => {
        console.log("updateOrder has been called");
        console.log("mTempOrderItems", mTempOrderItems);
        let mTables = this.state.tables;
        for(let i = 0; i < mTables.length; i++){
            if(mTables[i].tableID === mTableID){
                mTables[i].order.orderItems = mTables[i].order.orderItems.concat(mTempOrderItems);
            }
        }
        this.setState({
            tables: mTables
        });
    }

    confirmOrder = (mTableID, mTempOrderItems) => {
        console.log("updateOrder has been called");
        console.log("mTempOrderItems", mTempOrderItems);
        let mTables = this.state.tables;
        for(let i = 0; i < mTables.length; i++){
            if(mTables[i].tableID === mTableID){
                mTables[i].order.orderItems = mTables[i].order.orderItems.concat(mTempOrderItems);
            }
        }
        this.setState({
            tables: mTables
        });
        this.sendOrderItemsToKitchen(mTableID, mTempOrderItems)
    }
    //Matt,
    //This function should make a database call
    sendOrderItemsToKitchen = async (mTableID, mTempOrderItems) =>{
        console.log("In sendOrderItemsToKitchen");
        //Convert mTempOrderItems into JSON string
        const jString = JSON.stringify(mTempOrderItems);
        console.log("jString", jString);
        let docRef = await addDoc(collection(
            this.props.dbProps, "orders"),{
                tableID: mTableID,
                orderItems: jString
            });
        console.log("Document written with ID: ", docRef.id);
        //Try parsing the JSON string
        const jParsed = JSON.parse(jString);
        console.log("jParsed", jParsed);
    }

    

    goToSeatingChart = () =>{
        this.setState({
            mainContent: {
                name : "Seating Chart",
                component: SeatingChart,
            }
        })
    }

    // The idea behind this function is to dynamically create
    // the components we need for each with all the state
    // and function written in this class.
    // This is sort of like a Factory Method
    generateMainContentView = () =>{
        console.log("mainContent.name is ", this.state.mainContent.name);
        switch(this.state.mainContent.name){
            case "Seating Chart":{
                return (
                    <SeatingChart 
                    userIDProps={this.state.userID}
                    userClassProps={this.state.userClass}
                    tablesProps={this.state.tables}
                    orderViewProps={this.executeViewOrder}
                    />
                )
            }
            case "Order View":{
                return (
                    
                    <OrderView 
                    userIDProps={this.state.userID}
                    userClassProps={this.state.userClass}
                    orderProps={this.state.orderModel}
                    updateOrderProps={this.updateOrder}
                    confirmOrderProps={this.confirmOrder}
                    goToSeatingChartProps={this.goToSeatingChart}
                    />
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
                        topBarBackProps = {this.handleBackClick}
                        topBarTitleProps={this.state.topBarTitle}
                        userIDProps={this.state.userID}
                        userClassProps={this.state.userClass}
                        logoutOfAppProps={this.props.logoutOfAppProps}
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