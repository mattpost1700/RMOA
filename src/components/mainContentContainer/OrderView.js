import React from "react";

import Order from "../Order"
import OrderSubView from "./OrderSubView";
// Not sure if this is a good idea or not, but the idea is
// to have this class represent the OrderModel

class OrderView extends React.Component{  
    state ={
        // We'll use state here temporarily keep any OrderItems
        // added to a bill before confirming our selection
        // Since every order has an associated bill, we can
        // put every added OrderItem in this array and sort it later.
        tempOrderItems: []
    }
    // This function take the order and separates
    // it into different bills. billsArray is a 2D array.
    // This function also sets up the state for the 
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
    render(){
        let mBillsArray = this.generateOrderSubView();
        return(
            // Cory, what I think would be a good idea is to make
            // the orderSubContainer a swipable left & right element.
            // Within that container, we'll generate each bill that
            // we need. Those bills should be selectable/deselectable.
            // Depending on how many are selected, the buttons on the
            // right should have different functions or not have a function
            // at all i.e. not clickable. I'm naming it OrderSubView
            // instead of BillView, since BillView will most likely be
            // used elsewhere.
            <div>
                <div id="infoContainer">
                    <p>Table #: {this.props.orderProps.tableID}</p>
                    <p>Order # {this.props.orderProps.order.orderID}</p>
                </div>
                
                <div id="orderSubContainer"
                    style={{
                        width: "400px",
                        height: "300px",
                        border: "1px solid",
                    }}
                >
                    
                    {
                    mBillsArray.map((bill, index) =>(
                        <div
                        key={index}
                        style={{
                            width: "100px",
                            height: "200px",
                            border: "1px solid",
                        }}
                        > 
                        <OrderSubView
                        billProps={bill}
                        />
                        </div>
                    ))
                    }
                </div>

                <div id="buttonsContainer">
                    <button id="food/drinkMenu">Food/Drink</button>
                    <button id="splitFunction">Split</button>
                    <button id="mergeFunction">Merge</button>
                    <button id="confirmFunction">Confirm</button>
                </div>
            </div>
        )
    }

}
export default OrderView