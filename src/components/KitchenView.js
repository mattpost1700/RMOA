import React from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

import OptionScreen from "./mainContentContainer/OptionScreen";
import OrdersToMakeView from "./mainContentContainer/OrdersToMakeView";
import { collection, getDocs, query, where } from 'firebase/firestore';
import "../appCSS/main-screen-overlay.css";
class KitchenView extends React.Component{
    state = {
        lastOrderIDGenerated: 1000,
        topBarTitle: "RMOA",
        userID: "17055",
        userClass: "Kitchen",
        visited: [],
        currSideBarID: 1,
        sideBarOptions: [
            {
                id: 1,
                title: "OrdersToMake",
                component: OrdersToMakeView,
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
            name : "OrdersToMake",
        },
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
    generateMainContentView = () =>{
        console.log("mainContent.name is ", this.state.mainContent.name);
        switch(this.state.mainContent.name){
            case "OrdersToMake":{
                return (
                    <OrdersToMakeView dbProps={this.props.dbProps} />
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
export default KitchenView