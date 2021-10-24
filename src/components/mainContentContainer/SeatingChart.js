import React from "react";

import ResTable from "../ResTable";
import Order from "../Order"
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
               />
               </li>
           ))
        }
          </div>  
        ) 
    }
}
export default SeatingChart