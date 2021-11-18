import React from "react";
import FoodDrinkSubView from "./FoodDrinkSubView";
import MenuView from "./MenuView";
class FoodDrinkView extends React.Component{
    state = {
        tempOrderItems: [],
    }
    handleBackToOrderViewClicked = () =>{
        console.log("handleBackToOrderViewClicked is clicked!");
        this.props.backToOrderViewProps();
    }
    getTempOrderItems = () =>{
        return this.state.tempOrderItems;
    }
    modifyItemsCallback = (mOrderItems) =>{      
        this.setState({
            tempOrderItems: mOrderItems
        })
    }
    render(){
        let morderItemsProps = this.props.billModelProps.orderItems.concat(this.state.tempOrderItems);
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
                modifyItemsCallback={this.modifyItemsCallback}
                />
                </div>
            </div>
        )
    }
}
export default FoodDrinkView