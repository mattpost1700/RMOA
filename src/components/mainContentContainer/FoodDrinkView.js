import React from "react";
import FoodDrinkSubView from "./FoodDrinkSubView";
import MenuView from "./MenuView";
import "../../appCSS/food-drink-view.css";
class FoodDrinkView extends React.Component{
    state = {
        mSwitch: -1,
        addClick: false,
    }
    handleBackToOrderViewClicked = () =>{
        console.log("handleBackToOrderViewClicked is clicked!");
        this.props.backToOrderViewProps();
    }

    modifyItemsCallback = () =>{
        this.setState({mSwitch: this.state.mSwitch * -1})
    }

    addClicked = () => {
        this.setState({addClick: true})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.addClick) {
            this.messagesEnd.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
            this.setState({addClick: false});
        }
    }

    render(){
        let mBill = this.props.billModelProps.bill;
        let morderItemsProps = this.props.billModelProps.orderItems.concat(this.props.getTempOrderItemsBillsProps()[mBill-1]);
        return(
            <div className={"food-drink"}>
                <button className={"food-drink__back"}
                    id="backToOrderView"
                    onClick={() => this.handleBackToOrderViewClicked()}
                >&#60;&#60; Back to Orders</button>
                <div className="food-drink__wrapper">
                    <div className="food-drink__bill-wrapper">
                        <div id="bill" className={"food-drink__bill"}>

                            <p className={"food-drink__bill-num"}>Bill #{morderItemsProps[0].bill}</p>
                            <FoodDrinkSubView
                                orderItemsProps={morderItemsProps}
                                billModelProps={this.props.billModelProps}
                                removeOrderItemProps={this.props.removeOrderItemProps}
                                modifyItemsCallbackProps={this.modifyItemsCallback}
                            />
                            <div className={"food-drink__scroll"} ref={(el) => {this.messagesEnd = el;}}/>
                        </div>
                    </div>
                    <div className="food-drink__menu-wrapper">
                        <div id="menu" className={"food-drink__menu"}>
                            <p className={"food-drink__title"}>Menu</p>
                            <MenuView
                                orderItemsProps={morderItemsProps}
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