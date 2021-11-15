import React from "react";
import FoodDrinkSubView from "./FoodDrinkSubView";
import MenuView from "./MenuView";
class FoodDrinkView extends React.Component{
    handleBackToOrderViewClicked = () =>{
        console.log("handleBackToOrderViewClicked is clicked!");
        this.props.backToOrderViewProps();
    }
    render(){
        return(
            <div>
                <button 
                id="backToOrderView"
                onClick={() => this.handleBackToOrderViewClicked()}
                >Back to Orders</button>
                <div id="bill">
                <FoodDrinkSubView 
                orderItemsProps={this.props.billModelProps.orderItems}
                removeOrderItemProps={this.props.removeOrderItemProps}
                />
                </div>
                <div id="menu">
                <MenuView 
                billModelProps={this.props.billModelProps}
                addOrderItemsProps={this.props.addOrderItemsProps}
                />
                </div>
            </div>
        )
    }
}
export default FoodDrinkView