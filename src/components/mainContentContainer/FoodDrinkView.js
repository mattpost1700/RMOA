import React from "react";
import FoodDrinkSubView from "./FoodDrinkSubView";
import MenuView from "./MenuView";
import "../../appCSS/food-drink-view.css";
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
        let morderItemsProps = this.props.billModelProps.orderItems.concat(this.props.getTempOrderItemsProps());
        return(
            <div className={"food-drink"}>
                <button className={"food-drink__back"}
                    id="backToOrderView"
                    onClick={() => this.handleBackToOrderViewClicked()}
                >Back to Orders</button>
                <div className="food-drink__wrapper">
                <div id="bill" className={"food-drink__bill"}>
                    <div className="food-drink__subbill">
                    <p className={"food-drink__bill-num"}>Bill #{morderItemsProps[0].bill}</p>
                    <FoodDrinkSubView
                        orderItemsProps={morderItemsProps}
                        billModelProps={this.props.billModelProps}
                        removeOrderItemProps={this.props.removeOrderItemProps}
                        modifyItemsCallbackProps={this.modifyItemsCallback}
                    />
                    </div>
                </div>
                <div id="menu" className={"food-drink__menu"}>
                    <MenuView
                        orderItemsProps={morderItemsProps}
                        billModelProps={this.props.billModelProps}
                        addOrderItemsProps={this.props.addOrderItemsProps}
                        modifyItemsCallbackProps={this.modifyItemsCallback}
                    />
                </div>
                </div>
            </div>
        )
    }
}
export default FoodDrinkView