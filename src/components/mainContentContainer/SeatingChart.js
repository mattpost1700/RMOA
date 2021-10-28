import React from "react";

import ResTable from "../ResTable";

// This class could be synonymous with a TableView class
// to go along with the OrderView class
// They serve similar purposes
class SeatingChart extends React.Component{
    render(){
        return (
            //This div should be a grid container in CSS
            <div
            id="SeatingChartContainer"
            style={{
                border: "solid 1px",
                height: "350px",
                width: "350px",
            }}
            >
           {
           this.props.tablesProps.map(table =>(
               <li 
               key={table.tableID}
               >
               <ResTable 
               tableProps={table}
               orderViewProps={this.props.orderViewProps}
               />
               </li>
           ))
        }
          </div>  
        ) 
    }
}
export default SeatingChart