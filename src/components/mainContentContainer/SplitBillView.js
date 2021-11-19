import React from "react";
import SplitBillSubView from "./SplitBillSubView";
class SplitBillView extends React.Component{
    handleBackToOrderViewClicked = () =>{
        console.log("handleBackToOrderViewClicked is clicked!");
        this.props.backToOrderViewProps();
    }
    render(){
        let mBill = this.props.billModelProps.bill;
        let morderItemsProps = this.props.billModelProps.orderItems.concat(this.props.getTempOrderItemsBillsProps()[mBill-1]);
        return(
            <div>
                <button 
                id="backToOrderView"
                onClick={() => this.handleBackToOrderViewClicked()}
                >Back to Orders</button>
                <div id="firstbill">
                <SplitBillSubView 
                orderItemsProps={morderItemsProps}
                billModelProps={this.props.billModelProps}
                
                />
                </div>
                <div id="newbill">
                <SplitBillSubView
                orderItemsProps={morderItemsProps}
                billModelProps={this.props.billModelProps}
                
                />
                </div>
            </div>
        )
    }
}
export default SplitBillView