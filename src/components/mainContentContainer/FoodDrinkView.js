import React from "react";
import FoodDrinkSubView from "./FoodDrinkSubView";
import MenuView from "./MenuView";
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
        let morderItemsProps = this.props.billModelProps.orderItems.concat(this.props.getTempOrderItemsBillsProps()[mBill-1]);
        return(
            <div>
                <button 
                id="backToOrderView"
                onClick={() => this.handleBackToOrderViewClicked()}
                >Back to Orders</button>
                <div id="bill">
                <FoodDrinkSubView 
                orderItemsProps={morderItemsProps}
                billModelProps={this.props.billModelProps}
                removeOrderItemProps={this.props.removeOrderItemProps}
                modifyItemsCallbackProps={this.modifyItemsCallback}
                />
                </div>
                <div id="menu">
                <MenuView 
                orderItemsProps={morderItemsProps}
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