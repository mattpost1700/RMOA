import React from "react";
import "../../appCSS/order-view.css";
import OrderItem from "../OrderItem"

import OrderSubView from "./OrderSubView";
import FoodDrinkView from "./FoodDrinkView";
// Not sure if this is a good idea or not, but the idea is
// to have this class represent the OrderModel

class OrderView extends React.Component{  
    state ={
        lastOrderItemIDGenerated: 1000,
        // We'll use state here temporarily keep any OrderItems
        // added to a bill before confirming our selection
        // Since every order has an associated bill, we can
        // put every added OrderItem in this array and sort it later.
        tempOrderItems: [],

        // An array of booleans
        checkboxes: [],

        mainContent: {
            name: "Main OrderView"
        },
        firstBillModel: {
            orderID: 0,
            paid: false,
            bill: 0,
            orderItems: []
        },
        secondBillModel: {
            orderID: 0,
            paid: false,
            bill: 0,
            orderItems: []
        },

    }
    // This function setups the state for the checkboxes.
    // This should be run in the constructor of the React.Component
    // It sets all the checkboxes to false. This might need
    // to be tweaked in the future.
    setCheckboxes = () =>{
        console.log("In setCheckBoxes");
        let numOfBills = this.props.orderProps.order.totalBills;
        console.log("numOfBills", numOfBills);
        let mCheckboxes = [];
        for(let i = 0; i < numOfBills; i++){
            mCheckboxes.push(false);
        }
        console.log("mCheckboxes", mCheckboxes);
        return mCheckboxes;
    }
    handleCheckboxClick = (mIndex) =>{
        //console.log("hello from handleCheckboxClick method");
        //console.log("index is", index);
        
        let flag = this.state.checkboxes[mIndex];
        //console.log("flag is", flag);
        if(flag === true){
            let temp = this.state.checkboxes;
            for(let i = 0; i < temp.length; i++){
                if(i === mIndex){
                    temp[i] = false;
                }
            }
            this.setState({checkboxes: temp})
        }
        else if(flag === false){
            let count = 0;
            let flags = this.state.checkboxes;
            for(let i = 0; i < flags.length; i++){
                if(flags[i] === true){
                    //console.log("flags[i] was ", flags[i]);
                    count = count + 1;
                }
            }
            if(count < 2){
                //console.log("count is ", count);
                let temp = this.state.checkboxes;
                for(let i = 0; i < temp.length; i++){
                    if(i === mIndex){
                        temp[i] = true;
                    }
                }
                this.setState({checkboxes: temp})
            }
        }
        this.setState({checkboxes: this.state.checkboxes});
    }
    backToOrderView = () =>{
        this.setState({
            mainContent:{
                name: "Main OrderView"
            }
        })
    }
    //**************************************************************** */
    // Food/Drink methods
    //

    
    // If zero or two bills are selected, this function does nothing
    handleFoodDrinkClicked = () =>{
        console.log("handleFoodDrinkClicked is clicked!");
        let [firstBill, secondBill] = this.getBillsSelected();
        console.log("firstBill", firstBill);
        console.log("secondBill", secondBill);
        if(firstBill !== 0 && secondBill === 0){
            //set the BillModel
            let mOrderItems = this.generateOrderSubView()[firstBill - 1]; //Handle off by 1
            console.log("mOrderItems", mOrderItems);
            this.setState(
                {firstBillModel: {
                    orderID: this.props.orderProps.tableID,
                    paid: false,
                    bill: firstBill,
                    orderItems: mOrderItems,
                }
                }
            )
            //set mainContent to render FoodDrinkView
            this.setState({
                mainContent:{
                    name: "FoodDrinkView"
                }
            })
        }
    }
    generateOrderItemId = () =>{
        let newOrderItemID = this.state.lastOrderItemIDGenerated + 1;
        this.setState({lastOrderItemIDGenerated: newOrderItemID});
        return newOrderItemID;
    }
    addOrderItems = (mMenuItem, mBill, callback) =>{
        let mOrderItem = new OrderItem(mMenuItem);
        mOrderItem.bill = mBill;
        mOrderItem.id = this.generateOrderItemId();
        console.log("mOrderItem to add", mOrderItem);
        let updatedTempOrderItems = this.state.tempOrderItems.concat(mOrderItem);
        this.setState({tempOrderItems: updatedTempOrderItems});
        callback(this.state.tempOrderItems);
    }

    removeOrderItem = (mOrderItem,callback) =>{
        this.setState({
            tempOrderItems: [
                ...this.state.tempOrderItems.filter(item =>{
                    return item.id !== mOrderItem.id
                })
            ]
        })
        callback(this.state.tempOrderItems);
    }
    //**************************************************************** */
    // SplitBill methods
    //
    handleSplitClicked = () =>{
        console.log("handleSplitClicked is clicked!");

    }

    //**************************************************************** */
    // MergeBill methods
    //
    handleMergeClicked = () =>{
        console.log("handleMergeClicked is clicked");

    }

    //**************************************************************** */
    // Confirm methods
    //
    handleConfirmClicked = () =>{
        console.log("handleConfirmClicked is clicked!");

    }

    // Returns the checkboxes selected by bill ID/Number
    // Zero indicates bill was not chosen
    // If only one bill is chosen, only bill_1 will be nonzero
    getBillsSelected = () =>{
        let bill_1 = 0;
        let bill_2 = 0;
        this.state.checkboxes.forEach((element,index) => {
            if(element === true && bill_1 === 0){
                bill_1 = index + 1;// In order to handle off by 1
            }
            else if(element === true && bill_1 !== 0){
                bill_2 = index + 1;// In order to handle off by 1
            }
        });
        console.log("bill_1", bill_1);
        console.log("bill_2", bill_2);
        return [bill_1,bill_2];
    }
    // Like in MainScreenOverlay, there are multiple views that
    // need to be dynamically created. Doing it this way allows each
    // possible subview to dictate how it wants to use the parent
    // container's space
    generateMainContentView = () =>{
        switch(this.state.mainContent.name){
            case "Main OrderView":{
                let mBillsArray = this.generateOrderSubView();
            return(
                <div className={"orderView"}>
                    <div id="infoContainer" className={"orderView__info"}>
                        <p className={"orderView__tableNum"}>Table #: {this.props.orderProps.tableID}</p>
                        <div id="buttonsContainer" className={"orderView__buttons"}>
                            <button id="food/drinkMenu" 
                            className={"orderView__button"}
                            onClick={() => this.handleFoodDrinkClicked()}
                            >Food/Drink</button>
                            <button id="splitFunction" 
                            className={"orderView__button"}
                            onClick={() => this.handleSplitClicked()}
                            >Split</button>
                            <button id="mergeFunction" 
                            className={"orderView__button"}
                            onClick={() => this.handleMergeClicked()}
                            >Merge</button>
                            <button id="confirmFunction" 
                            className={"orderView__button"}
                            onClick={() => this.handleConfirmClicked()}
                            >Confirm</button>
                        </div>
                        <p className={"orderView__orderNum"}>Order # {this.props.orderProps.order.orderID}</p>
                    </div>                  
                    <div id="orderSubContainer" className={"orderView__container"}>                      
                        {
                        mBillsArray.map((bill, index) =>(
                            <div className="orderView__order-wrapper"
                            key={index}
                            >
                            <input
                                className={"orderView__selection"}
                                type="checkbox"
                                checked={this.state.checkboxes[index]}
                                onChange={() => this.handleCheckboxClick(index)}
                            />
                            <div className={"orderView__order"}                           
                            > 
                            <OrderSubView
                            billProps={bill}
                            />
                            </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            )
            }
            case "FoodDrinkView":{
                return(
                    <FoodDrinkView
                    billModelProps={this.state.firstBillModel}
                    addOrderItemsProps={this.addOrderItems}
                    removeOrderItemProps={this.removeOrderItem}
                    backToOrderViewProps={this.backToOrderView}
                    ></FoodDrinkView>
                )
            }
            case "SplitBillView":{
                return(
                    <p>I'm a SplitBillView</p>
                )
            }
            case "MergeBillView":{
                return(
                    <p>I'm a MergeBillView</p>
                )
            }

        }
       
    }
    // This function take the order and separates
    // it into different bills. billsArray is a 2D array.
    generateOrderSubView = () =>{
        let billsArray = []
        let numOfBills = this.props.orderProps.order.totalBills;
        for(let i = 0; i < numOfBills; i++){
            //Pushing empty arrays to fill
            billsArray.push([]);
        }
        //These are the confirmed OrderItems
        let mOrderItems = this.props.orderProps.order.orderItems;
        for(let i = 0; i < mOrderItems.length; i++){
            // The array value will be minus 1 of the actual bill
            let mBill = mOrderItems[i].bill - 1;
            billsArray[mBill].push(mOrderItems[i]);
        }
        let mTempOrderItems = this.state.tempOrderItems;
        for(let i = 0; i < mTempOrderItems.length; i++){
            // The array value will be minus 1 of the actual bill
            let mBill = mTempOrderItems[i].bill - 1;
            billsArray[mBill].push(mTempOrderItems[i]);
        }
        return billsArray
    }
    
    //**************************************************************** */
    // LifeCycle methods
    //
    constructor(props){
        super(props);
        this.state.checkboxes = this.setCheckboxes();
    }
    render(){
        const mainContentView = this.generateMainContentView();
        return(
            <div>
            {mainContentView}
            </div>
        )
    }

}
export default OrderView