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

    // Checks if either array is empty and returns appropriate array
    // At least one array should be nonempty
    collectOrderItems = (mBill, mConfirmedOrderItems, mTempOrderItems) =>{
        if(mConfirmedOrderItems !== undefined && mTempOrderItems !== undefined){
            return mConfirmedOrderItems.concat(mTempOrderItems);
        }
        else if(mConfirmedOrderItems !== undefined && mTempOrderItems === undefined){
            return mConfirmedOrderItems;
        }
        else if(mConfirmedOrderItems === undefined && mTempOrderItems !== undefined){
            return mTempOrderItems;
        }
    }
    render(){
        let mOrderItems = this.collectOrderItems(this.props.billModelProps.bill, 
                                                this.props.billModelProps.orderItems,
                                                this.props.getTempOrderItemsBillsProps().getValueOfKey(this.props.billModelProps.bill));
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