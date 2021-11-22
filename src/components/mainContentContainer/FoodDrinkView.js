import React from "react";
import FoodDrinkSubView from "./FoodDrinkSubView";
import MenuView from "./MenuView";
import Dictionary from "../dataStructures/Dictionary";
class FoodDrinkView extends React.Component{
    state = {
        mSwitch: -1,
    }
    handleBackToOrderViewClicked = () =>{
        console.log("handleBackToOrderViewClicked is clicked!");
        this.props.backToOrderViewProps();
    }
    
    modifyItemsCallback = () =>{      
        this.setState({mSwitch: this.state.mSwitch * -1})
    }
    render(){
        let mBill = this.props.billModelProps.bill;
        let mOrderItems = this.props.billModelProps.orderItems
        let mTempOrderItems = this.props.getTempOrderItemsBillsProps().getValueOfKey(mBill);
        if(mTempOrderItems !== undefined){
            mOrderItems = mOrderItems.concat(mTempOrderItems);
        }
        return(
            <div>
                <button 
                id="backToOrderView"
                onClick={() => this.handleBackToOrderViewClicked()}
                >Back to Orders</button>
                <div id="bill">
                <FoodDrinkSubView 
                orderItemsProps={mOrderItems}
                billModelProps={this.props.billModelProps}
                removeOrderItemProps={this.props.removeOrderItemProps}
                modifyItemsCallbackProps={this.modifyItemsCallback}
                />
                </div>
                <div id="menu">
                <MenuView 
                orderItemsProps={mOrderItems}
                billModelProps={this.props.billModelProps}
                addOrderItemsProps={this.props.addOrderItemsProps}
                modifyItemsCallbackProps={this.modifyItemsCallback}
                />
                </div>
            </div>
        )
    }
}
export default FoodDrinkView