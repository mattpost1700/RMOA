import React from "react";
import FoodDrinkSubView from "./FoodDrinkSubView";
import MenuView from "./MenuView";
import Dictionary from "../dataStructures/Dictionary";
import '../../appCSS/food-drink-view.css';
class FoodDrinkView extends React.Component{
    state = {
        mSwitch: -1,
        addClicked: false,
    }
    handleBackToOrderViewClicked = () =>{
        console.log("handleBackToOrderViewClicked is clicked!");
        this.props.backToOrderViewProps();
    }
    
    modifyItemsCallback = () =>{      
        this.setState({mSwitch: this.state.mSwitch * -1})
    }

    // Checks if either array is empty and returns appropriate array
    // If only temporary are present, an undefined object could occur.
    // Try returning an empty array to fix this issue.
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
        else{
            return [];
        }
    }
    addClicked = () => {
        this.setState({addClick: true})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.addClicked) {
            this.messageEnd.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
            this.setState({addClick: false});
        }
    }

    render(){
        let mBill = this.props.billModelProps.bill;
        let mOrderItems = this.collectOrderItems(this.props.billModelProps.bill, 
                                                this.props.billModelProps.orderItems,
                                                this.props.getTempOrderItemsBillsProps().getValueOfKey(this.props.billModelProps.bill));
        return(
            <div className={"food-drink"}>
                <button className={"food-drink__back"}
                id="backToOrderView"
                onClick={() => this.handleBackToOrderViewClicked()}
                >&#60;&#60; Back to Orders</button>
                <div className={"food-drink__wrapper"}>
                    <div className="food-drink__bill-wrapper">
                        <div id="bill" className={"food-drink__bill"}>
                            <p className={"food-drink__bill-num"}>Bill #{mBill}</p>
                            <FoodDrinkSubView
                        orderItemsProps={mOrderItems}
                        billModelProps={this.props.billModelProps}
                        removeOrderItemProps={this.props.removeOrderItemProps}
                        modifyItemsCallbackProps={this.modifyItemsCallback}
                        />
                            <div className="food-drink__scroll" ref={(el) => {this.messageEnd = el;}}/>
                        </div>
                    </div>

                    <div className="food-drink__menu-wrapper">
                        <div id="menu" className={"food-drink__menu"}>
                            <p className={"food-drink__title"}>Menu</p>
                        <MenuView
                        orderItemsProps={mOrderItems}
                        billModelProps={this.props.billModelProps}
                        addOrderItemsProps={this.props.addOrderItemsProps}
                        modifyItemsCallbackProps={this.modifyItemsCallback}
                        addClickProps={this.addClicked}
                        />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default FoodDrinkView