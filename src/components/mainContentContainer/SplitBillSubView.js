import React from "react";
import SplitBillView from "./SplitBillView";

class SplitBillSubView extends React.Component{
    handleCheckboxClicked = (index) =>{
        console.log("handleCheckboxClicked has been clicked!");
        this.props.updateCheckboxesProps(this.props.nameProps, index);
    }
    render(){
        // The index of the orderItemsProps should line up with
        // the index of the related checkbox boolean value
        return(
            <ol>
                {this.props.orderItemsProps.map((mOrderItem, index) =>(
                    <li
                    key={index}
                    >
                    <span >{mOrderItem.name} - </span> <span>${mOrderItem.price}</span>
                    <input 
                    type="checkbox"
                    checked={this.props.checkboxesProps[index]}
                    onChange={() => this.handleCheckboxClicked(index)}
                    />
                    </li>
                ))}
            </ol>
        )
    }
}
export default SplitBillSubView