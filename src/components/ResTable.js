import React from "react";
import "../appCSS/res-table.css";

class ResTable extends React.Component{
    render(){
        console.log(this.props.tableProps.status === "free");
        return (
            <button className={(this.props.tableProps.status === "free") ? "table table-free" : "table table-occupied"}
            onClick={() => this.props.orderViewProps(this.props.tableProps)}
            >
                <p>Table {this.props.tableProps.tableID}</p>
                <p>{(this.props.tableProps.status === "free") ? "Capacity: " + this.props.tableProps.capacity : "Table Full"}</p>
            </button>
        )
    }
}
export default ResTable