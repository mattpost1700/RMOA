import React from "react";
import "../../appCSS/order-view.css";
import OrderItem from "../OrderItem"

import OrderSubView from "./OrderSubView";
import FoodDrinkView from "./FoodDrinkView";
import SplitBillView from "./SplitBillView";
import MergeBillView from "./MergeBillView";
import Dictionary from "../dataStructures/Dictionary";
import {map} from "react-bootstrap/ElementChildren";
// Not sure if this is a good idea or not, but the idea is
// to have this class represent the OrderModel

class OrderView extends React.Component{  
    state ={
        lastOrderItemIDGenerated: 1000,
        lastBillIDGenerated: 99,
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
    setCheckboxesRefactor = () =>{
        console.log("In setCheckBoxes");
        let numOfBills = this.props.orderProps.order.totalBills;
        console.log("numOfBills", numOfBills);
        let mCheckboxes = new Dictionary();
        let billNumbers = this.generateOrderSubViewRefactor().getAllKeys();
        for(let i = 0; i < billNumbers.length; i++){
            //All billNumbers should be unique
            mCheckboxes.addKeyPair(billNumbers[i],{checked:false});
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
    handleCheckboxClickRefactor = (mIndex) =>{
        console.log("hello from handleCheckboxClick method");
        console.log("index is", mIndex);

        let temp = new Dictionary(this.state.checkboxes);
        let flag = temp.getValueOfKey(mIndex).checked;
        console.log("flag is", flag);
        if(flag === true){
            temp.addKeyPair(mIndex, {checked:false});
            this.setState({checkboxes: temp})
        }
        else if(flag === false){
            let count = 0;
            let keys = this.state.checkboxes.getAllKeys();
            for(let i = 0; i < keys.length; i++){
                if(temp.getValueOfKey(keys[i]).checked === true){
                    count = count + 1;
                }
            }
            if(count < 2){
                //console.log("count is ", count);
                temp.addKeyPair(mIndex, {checked:true});
                this.setState({checkboxes: temp})
            }
        }
    }
    backToOrderView = () =>{
        this.resetCheckboxes();
        this.setState({
            mainContent:{
                name: "Main OrderView"
            }
        })
    }
    resetCheckboxes = () =>{
        let temp = this.setCheckboxesRefactor();
        this.setState({
            checkboxes: temp
        })
    }
    //**************************************************************** */
    // Food/Drink methods
    //


    // If zero or two bills are selected, this function does nothing
    handleFoodDrinkClicked = () =>{
        console.log("handleFoodDrinkClicked is clicked!");
        let [firstBill, secondBill] = this.getBillsSelectedRefactor();
        console.log("firstBill", firstBill);
        console.log("secondBill", secondBill);
        if(firstBill !== 0 && secondBill === 0){
            //set the BillModel
            //Cannot use generateOrderSubView()
            //let mOrderItems = this.getConfirmedOrderItemsBills()[firstBill - 1]; //Handle off by 1
            let mOrderItemsR = this.getConfirmedOrderItemsBillsRefactor().getValueOfKey(firstBill);
            console.log("mOrderItems", mOrderItemsR);
            this.setState(
                {firstBillModel: {
                    orderID: this.props.orderProps.tableID,
                    paid: false,
                    bill: firstBill,
                    orderItems: mOrderItemsR,
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
        callback();
    }

    removeOrderItem = (mOrderItem,callback) =>{
        let temp = [...this.state.tempOrderItems.filter(item =>{
            return item.id !== mOrderItem.id;
        })]
        this.setState({tempOrderItems: temp})
        callback();
    }

    getTempOrderItems = () =>{
        return this.state.tempOrderItems;
    }
    //**************************************************************** */
    // SplitBill methods
    //
    handleSplitClicked = () =>{
        console.log("handleSplitClicked is clicked!");
        let [firstBill, secondBill] = this.getBillsSelectedRefactor();
        console.log("firstBill", firstBill);
        console.log("secondBill", secondBill);
        if(firstBill !== 0 && secondBill === 0){
            //set the BillModel
            //Cannot use generateOrderSubView()
            //let mOrderItems = this.getConfirmedOrderItemsBills()[firstBill - 1]; //Handle off by 1
            let mOrderItemsR = this.getConfirmedOrderItemsBillsRefactor().getValueOfKey(firstBill);
            console.log("mOrderItems", mOrderItemsR);
            this.setState(
                {firstBillModel: {
                    orderID: this.props.orderProps.tableID,
                    paid: false,
                    bill: firstBill,
                    orderItems: mOrderItemsR,
                }
                }
            )
            //set mainContent to render FoodDrinkView
            this.setState({
                mainContent:{
                    name: "SplitBillView"
                }
            })
        }
    }
    generateBillId = () =>{
        let newBillID = this.state.lastBillIDGenerated + 1;
        this.setState({lastBillIDGenerated: newBillID})
        return newBillID;
    }
    moveOrderItemsToNewBill = (mOrderItems) =>{
        console.log("In moveOrderItemsToNewBill");
        console.log("mOrderItems", mOrderItems);
        let newBillNumber = this.generateBillId();
        let confirmedOrderItems = this.props.orderProps.order.orderItems;
        let mTempOrderItems = this.state.tempOrderItems;
        //Update with new bill number
        for(let i = 0; i < mOrderItems.length; i++){
            for(let j = 0; j < confirmedOrderItems.length; j++){
                if(mOrderItems[i].id === confirmedOrderItems[j].id){
                    confirmedOrderItems[j].bill = newBillNumber;
                }
            }
            for(let j = 0; j < mTempOrderItems.length; j++){
                if(mOrderItems[i].id === mTempOrderItems[j].id){
                    mTempOrderItems[j].bill = newBillNumber;
                }
            }
        }
        // Then set the state
        // Not sure which state to set first
        this.props.updateOrderProps(this.props.orderProps.orderID, confirmedOrderItems);
        this.setState({
            tempOrderItems: mTempOrderItems
        });
    }
    //**************************************************************** */
    // MergeBill methods
    //
    handleMergeClicked = () =>{
        console.log("handleMergeClicked is clicked");
        let [firstBill, secondBill] = this.getBillsSelectedRefactor();
        console.log("firstBill", firstBill);
        console.log("secondBill", secondBill);
        if(firstBill !== 0 && secondBill !== 0){
            //set the BillModel
            //Cannot use generateOrderSubView()
            //let mOrderItems = this.getConfirmedOrderItemsBills()[firstBill - 1]; //Handle off by 1
            let mOrderItemsFirstBill = this.getConfirmedOrderItemsBillsRefactor().getValueOfKey(firstBill);
            let mOrderItemsSecondBill = this.getConfirmedOrderItemsBillsRefactor().getValueOfKey(secondBill);
            console.log("mOrderItemsFirstBill", mOrderItemsFirstBill);
            console.log("mOrderItemsSecondBill", mOrderItemsSecondBill)
            this.setState(
                {firstBillModel: {
                    orderID: this.props.orderProps.tableID,
                    paid: false,
                    bill: firstBill,
                    orderItems: mOrderItemsFirstBill,
                },
                secondBillModel:{
                    orderId: this.props.orderProps.tableID,
                    paid: false,
                    bill: secondBill,
                    orderItems: mOrderItemsSecondBill
                }
                }
            )
            //set mainContent to render FoodDrinkView
            this.setState({
                mainContent:{
                    name: "MergeBillView"
                }
            })
        }
    }
    moveMultipleOrderItemsToNewBill = (bill1, mOrderItems1, bill2, mOrderItems2) =>{
        console.log("In moveMultipleOrderItemsToNewBill");
        let confirmedOrderItems = this.props.orderProps.order.orderItems;
        let mTempOrderItems = this.state.tempOrderItems;
        //OrderItems ID members will be unique
        //Check for emp
        for(let i = 0; i < confirmedOrderItems.length; i++){
            for(let j = 0; j < mOrderItems1.length; j++){
                if(confirmedOrderItems[i].id === mOrderItems1[j].id){
                    confirmedOrderItems[i].bill = bill1;
                }
            }
            for(let j = 0; j < mOrderItems2.length; j++){
                if(confirmedOrderItems[i].id === mOrderItems2[j].id){
                    confirmedOrderItems[i].bill = bill2;
                }
            }
        }
        for(let i = 0; i < mTempOrderItems.length; i++){
            for(let j = 0; j < mOrderItems1.length; j++){
                if(mTempOrderItems[i].id === mOrderItems1[j].id){
                    mTempOrderItems[i].bill = bill1;
                }
            }
            for(let j = 0; j < mOrderItems2.length; j++){
                if(mTempOrderItems[i].id === mOrderItems2[j].id){
                    mTempOrderItems[i].bill = bill2;
                }
            }
        }
        this.props.updateOrderProps(this.props.orderProps.orderID, confirmedOrderItems);
        this.setState({

            tempOrderItems: mTempOrderItems
        })
    }
    //**************************************************************** */
    // Confirm methods
    //
    handleConfirmClicked = () =>{
        console.log("handleConfirmClicked is clicked!");
        //Set all tempOrderItems to confirmed = true
        //Send all tempOrderItems up be handle in MainScreenOverlay
        //Remove all tempOrderItems from this state - taken care of by moving to the parent view
        //Go back to parent view
        let temp = this.state.tempOrderItems;
        if(temp.length > 0){
            for(let i = 0; i < temp.length; i++){
                temp[i].confirmed = true;
            }
            this.props.confirmOrderProps(this.props.orderProps.tableID, temp)
        }
        this.props.goToSeatingChartProps();
    
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
    // Returns the checkboxes selected by bill ID/Number
    // Zero indicates bill was not chosen
    // If only one bill is chosen, only bill_1 will be nonzero
    getBillsSelectedRefactor = () =>{
        let bill_1 = 0;
        let bill_2 = 0;
        let temp = new Dictionary(this.state.checkboxes);
        let keys = temp.getAllKeys();
        for(let i = 0; i < keys.length; i++){
            if(temp.getValueOfKey(keys[i]).checked === true &&
                bill_1 === 0){
                    bill_1 = parseInt(keys[i]);
                }
            else if(temp.getValueOfKey(keys[i]).checked === true &&
                bill_1 !== 0){
                    bill_2 = parseInt(keys[i]);
                }
        }
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
                //let mBillsArray = this.generateOrderSubView();
                let mBillsDict = this.generateOrderSubViewRefactor();
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
                    {//Refactored
                    //this.generateBills(mBillsArray)
                    this.generateBillsRefactor(mBillsDict)
                    }
                </div>
            )
            }
            case "FoodDrinkView":{
                return(
                    <FoodDrinkView
                    billModelProps={this.state.firstBillModel}
                    getTempOrderItemsBillsProps={this.getTempOrderItemsBillsRefactor}
                    addOrderItemsProps={this.addOrderItems}
                    removeOrderItemProps={this.removeOrderItem}
                    backToOrderViewProps={this.backToOrderView}
                    />
                )
            }
            case "SplitBillView":{
                return(
                    <SplitBillView
                    billModelProps={this.state.firstBillModel}
                    getTempOrderItemsBillsProps={this.getTempOrderItemsBillsRefactor}
                    backToOrderViewProps={this.backToOrderView}
                    moveOrderItemsToNewBillProps={this.moveOrderItemsToNewBill}
                    resetCheckboxesProps={this.resetCheckboxes}
                    newBillID={this.state.lastBillIDGenerated + 1}
                    />
                )
            }
            case "MergeBillView":{
                return(
                    <MergeBillView
                    firstBillModelProps={this.state.firstBillModel}
                    secondBillModelProps={this.state.secondBillModel}
                    getTempOrderItemsBillsProps={this.getTempOrderItemsBillsRefactor}
                    moveMultipleOrderItemsToNewBillProps={this.moveMultipleOrderItemsToNewBill}
                    backToOrderViewProps={this.backToOrderView}
                    resetCheckboxesProps={this.resetCheckboxes}
                    />
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
    // This function takes the order and separates
    // it into different bills. billsDict is a new Dictionary data structure
    generateOrderSubViewRefactor = () =>{
        let billsDict = new Dictionary();

        //These are the confirmed OrderItems
        let mOrderItems = this.props.orderProps.order.orderItems;
        for(let i = 0; i < mOrderItems.length; i++){
            if(!billsDict.isKey(mOrderItems[i].bill)){
                billsDict.addKeyPair(mOrderItems[i].bill, []);
                billsDict.addArrayElement(mOrderItems[i].bill, mOrderItems[i]);
            }
            else{
                billsDict.addArrayElement(mOrderItems[i].bill, mOrderItems[i]);
            }
        }
        //These are the temporary OrderItems
        let mTempOrderItems = this.state.tempOrderItems;
        for(let i = 0; i < mTempOrderItems.length; i++){
            if(!billsDict.isKey(mTempOrderItems[i].bill)){
                billsDict.addKeyPair(mTempOrderItems[i].bill, []);
                billsDict.addArrayElement(mTempOrderItems[i].bill, mTempOrderItems[i]);
            }
            else{
                billsDict.addArrayElement(mTempOrderItems[i].bill, mTempOrderItems[i]);
            }
        }

        return billsDict
    }
    getConfirmedOrderItemsBills = () =>{
        let billsArray = [];
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
        return billsArray
    }
    //Returns a Dictionary object
    getConfirmedOrderItemsBillsRefactor = () =>{
        let billsDict = new Dictionary();

        //These are the confirmed OrderItems
        let mOrderItems = this.props.orderProps.order.orderItems;
        for(let i = 0; i < mOrderItems.length; i++){
            if(!billsDict.isKey(mOrderItems[i].bill)){
                billsDict.addKeyPair(mOrderItems[i].bill, []);
                billsDict.addArrayElement(mOrderItems[i].bill, mOrderItems[i]);
            }
            else{
                billsDict.addArrayElement(mOrderItems[i].bill, mOrderItems[i]);
            }
        }
        return billsDict;
    }
    getTempOrderItemsBills = () =>{
        let billsArray = [];
        let numOfBills = this.props.orderProps.order.totalBills;
        for(let i = 0; i < numOfBills; i++){
            //Pushing empty arrays to fill
            billsArray.push([]);
        }
        let mTempOrderItems = this.state.tempOrderItems;
        for(let i = 0; i < mTempOrderItems.length; i++){
            // The array value will be minus 1 of the actual bill
            let mBill = mTempOrderItems[i].bill - 1;
            billsArray[mBill].push(mTempOrderItems[i]);
        }
        return billsArray
    }
    //Returns a Dictionary object
    getTempOrderItemsBillsRefactor = () =>{
        console.log("In getTempOrderItemsBillsRefactor");
        let billsDict = new Dictionary();
        //These are the temporary OrderItems
        let mTempOrderItems = this.state.tempOrderItems;
        for(let i = 0; i < mTempOrderItems.length; i++){
            if(!billsDict.isKey(mTempOrderItems[i].bill)){
                billsDict.addKeyPair(mTempOrderItems[i].bill, []);
                billsDict.addArrayElement(mTempOrderItems[i].bill, mTempOrderItems[i]);
            }
            else{
                billsDict.addArrayElement(mTempOrderItems[i].bill, mTempOrderItems[i]);
            }
        }
        console.log("billsDict", billsDict)
        return billsDict
    }



    //This function breaks the bills down if they are too large
    //This does not affect the actual data structure of a bill
    generateBillsRefactor = (mBillsDict) =>{
        //number of items per sub bill
        let numPerBill = 7;

        let billGroup = [];
        let bills = [];
        let olNum; //starting number for ordered list
        //loop through each bill
        // Instead of mBillsArray.length, use getAllKeys
        let billNumbers = mBillsDict.getAllKeys()
        for(let idx = 0; idx < billNumbers.length; idx++) {
            billGroup = [];

            //split the items in the bill into pages with length of numPerBill
            // Instead of mBillsArray[idx], use getValueOfKey, which will be an array in this case
            let subGroupOfSeven = [];
            let mBill = mBillsDict.getValueOfKey(billNumbers[idx]);
            for (let i = 0; i < mBill.length; i++) {
                //i.e. if this next element will be the 7th or last element
                // push to billGroup once added, then clear subGroupOfSeven for next subGroup
                if( ((i + 1) % numPerBill === 0) || (i + 1) === mBill.length){
                    subGroupOfSeven.push(mBill[i]);
                    billGroup.push(subGroupOfSeven);
                    subGroupOfSeven = [];
                }
                else{
                    subGroupOfSeven.push(mBill[i]);
                }

            }
            //billGroup should still be a 2D array at this point


            let page = [];

            let active = 'orderView__active';
            //loop for each page of the bill
            for (let i = 0; i < billGroup.length; i++) {
                olNum = i * numPerBill + 1;
                if(i > 0){
                    active = 'orderView__inactive';
                }
                page.push(
                    <div className={"orderView__order-subwrapper " + active} id={"bill"+billGroup[i][0].bill + "-page" + i}>

                        <div className={"orderView__order"}
                             key={idx}
                        >
                            <p className={"orderView__billnum"}>Bill # {billGroup[i][0].bill}</p>
                            <OrderSubView
                                billProps={billGroup[i]}
                                olStart={olNum}
                            />
                        </div>
                    </div>
                )
            }


            //add the order wrapper to the bill pages
            bills.push(<div className={"orderView__order-wrapper"} id={"bill" + billNumbers[idx]}>

                <input
                    className={"orderView__selection"}
                    type="checkbox"
                    checked={this.state.checkboxes.getValueOfKey(billNumbers[idx]).checked}
                    onChange={() => this.handleCheckboxClickRefactor(billNumbers[idx])}
                />
                {page}

                 <button className={"orderView__next"} onClick={() => {this.cycleBill(billNumbers[idx])}}>Next</button>


            </div>);
        }

        return(
            <div id="orderSubContainer" className={"orderView__container no-anim"}>
                {bills}
            </div>
        );

    }

    //Change bill page
    cycleBill = (bill) => {
        //prevent animation on page load
        if(document.getElementsByClassName("no-anim").length > 0) {
            document.getElementsByClassName("no-anim")[0].classList.remove("no-anim");
        }

        let curr = document.getElementById("bill" + bill);
        let pages = curr.getElementsByClassName("orderView__order-subwrapper");
        for(let i = 0; i < pages.length; i++){
            if(pages[i].classList.contains('orderView__active')){
                pages[i].classList.remove('orderView__active');
                pages[i].classList.add('orderView__inactive');
                if(i+1 < pages.length){
                    pages[i+1].classList.add('orderView__active');
                    pages[i+1].classList.remove('orderView__inactive');
                }else{
                    pages[0].classList.add('orderView__active');
                    pages[0].classList.remove('orderView__inactive');
                }

                let button = curr.getElementsByClassName("orderView__next")[0];
                button.classList.add("orderView__next-active");
                setTimeout(function(){
                    button.classList.remove("orderView__next-active");
                }, 800)

                return;
            }
        }





    }
    //**************************************************************** */
    // LifeCycle methods
    //
    constructor(props){
        super(props);
        console.log("In OrderView constructor!");
        //this.state.checkboxes = this.setCheckboxes();
        this.state.checkboxes = this.setCheckboxesRefactor();
        let numOfOrderItems = this.props.orderProps.order.orderItems.length
        this.state.lastOrderItemIDGenerated = 1000 + numOfOrderItems;
    }

    render(){
        const mainContentView = this.generateMainContentView();
        return(
            <div className={"content"}>
                {mainContentView}
            </div>
        )
    }

}
export default OrderView