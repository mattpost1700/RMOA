import React from "react";

class TopBar extends React.Component{
    render(){
        return(
            <div>
                <div id="leftPart"
                    style={{
                        border: "solid 1px",
                        float: "left",
                    }}
                >
                    <p>{this.props.topBarTitleProps}</p>
                    <button>Back</button>
                </div>
                <div id="middlePart"
                    style={{
                        border: "solid 1px",
                        float: "left"
                    }}
                >
                    <p>UserID: </p>
                    <p>{this.props.userIDProps}</p>
                    <p>UserClass: </p>
                    <p>{this.props.userClassProps}</p>
                </div>
                <div id="rightPart"
                    style={{
                        border: "solid 1px",
                        float: "left",
                    }}
                    >
                        <p>Date/Time</p>
                        <button>Logout</button>
                </div>
            </div>
        )
    }
}
export default TopBar