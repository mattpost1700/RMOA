import React from "react";

import "../appCSS/top-bar.css";

class TopBar extends React.Component{
    state = {
        date: new Date()
    }

    componentDidMount() {
        setInterval(this.updateTime, 1000)
    }

    updateTime = () =>{
        this.setState({date: new Date()})
    }

    handleLogoutClicked = () =>{
        this.props.logoutOfAppProps();
    }
    render(){
        return(
            <div 
            className={"topbar"}>
                <div 
                id="leftPart" 
                className={"topbar__left"}>
                    <p 
                    className={"topbar__left-text"}>
                    {this.props.topBarTitleProps}
                    </p>
                    <button 
                    className={"topbar__left-back"} 
                    onClick={this.props.topBarBackProps}>
                    &#60;&#60; Back
                    </button>
                </div>
                <div 
                className="topbar__wrapper">
                <div 
                id="middlePart" 
                className={"topbar__middle"}>
                    <p 
                    className={"topbar__middle-text"}>UserID: <span>{this.props.userIDProps}</span>
                    </p>
                    <p 
                    className={"topbar__middle-text"}>UserClass: <span>{this.props.userClassProps}</span>
                    </p>

                </div>
                <div 
                id="rightPart" 
                className={"topbar__right"}>
                    <p 
                    className={"topbar__right-text"}>{this.state.date.getMonth()+1}/{this.state.date.getDate()}/{this.state.date.getFullYear()}<br/> {this.state.date.toLocaleString('en-US', {hour: "numeric", minute: "numeric", second: "numeric", hour12: true})}</p>
                    <button className={"topbar__right-button"}
                    onClick={() => this.handleLogoutClicked()}
                    >Logout</button>
                </div>
                </div>
            </div>
        )
    }
}
export default TopBar