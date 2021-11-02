import React from "react";

import ResTable from "../ResTable";
import "../../appCSS/seating-chart.css";

// This class could be synonymous with a TableView class
// to go along with the OrderView class
// They serve similar purposes
class SeatingChart extends React.Component{
    render(){
        return (
            //This div should be a grid container in CSS
            <div className={"seating-chart-container"}
            id="SeatingChartContainer"
            >
           {
           this.props.tablesProps.map(table =>(
               <div className={"seating-chart-container__table-wrapper"}
               key={table.tableID}
               >
               <ResTable
               tableProps={table}
               orderViewProps={this.props.orderViewProps}
               />
               </div>
           ))
        }
          </div>  
        ) 
    }
}
export default SeatingChart