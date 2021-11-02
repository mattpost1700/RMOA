import React from "react";

class ResTable extends React.Component{
    render(){
        return (
            <button
            onClick={() => this.props.orderViewProps(this.props.tableProps)}
            >I'm a ResTable</button>
        )
    }
}
export default ResTable