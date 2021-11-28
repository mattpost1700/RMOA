import React from "react";
import SplitBillSubView from "./SplitBillSubView";
import Dictionary from "../dataStructures/Dictionary";
class SplitBillView extends React.Component{
    state = {
        orderItemsToKeep: [],
        orderItemsToUpdate: [],
        // An array of booleans
        toKeepCheckboxes: [],
        toUpdateCheckboxes: [],
    }
    handleCancelSplitClicked = () =>{
        console.log("handleCancelSplitClicked is clicked!");
        // All of the state in this component should be cleared when 
        // going back to the previous view, so all changes should be
        // forgotten.
        this.props.backToOrderViewProps();
    }
    handleConfirmSplitClicked = () =>{
        console.log("handleConfirmSplitClicked is clicked!");
        //Check if orderItemsToUpdate is nonempty
        
        if(this.state.orderItemsToUpdate.length > 0){
            console.log("orderItemsToUpdate", this.state.orderItemsToUpdate)
            this.props.moveOrderItemsToNewBillProps(this.state.orderItemsToUpdate);
        }
        this.props.resetCheckboxesProps();
        this.props.backToOrderViewProps();
    }
    handleMoveLeftClicked = () =>{
        console.log("handleMoveLeftClicked is clicked!");
        //Copy selected orderItemsToUpdate to temporary array
        let toCopy = [];
        for(let i = 0; i < this.state.toUpdateCheckboxes.length; i++){
            if(this.state.toUpdateCheckboxes[i] === true){
                toCopy.push(this.state.orderItemsToUpdate[i]);
            }
        }
        console.log("toCopy", toCopy);

        //Filter out copied OrderItems
        let copyToUpdate = this.state.orderItemsToUpdate;
        for(let i = 0; i < toCopy.length; i++){
            //This could be refactored to a nicer implementation
            copyToUpdate = copyToUpdate.filter((mOrderItem) =>mOrderItem.id !== toCopy[i].id)
        }
        console.log("copyToUpdate", copyToUpdate);

        //Now set appropriate states
        let copyToKeep = this.state.orderItemsToKeep.concat(toCopy);
        let mToKeepCheckboxes = this.setCheckboxes(copyToKeep);
        let mToUpdateCheckboxes = this.setCheckboxes(copyToUpdate);
        this.setState({
            orderItemsToKeep: copyToKeep,
            orderItemsToUpdate: copyToUpdate,
            toKeepCheckboxes: mToKeepCheckboxes,
            toUpdateCheckboxes: mToUpdateCheckboxes
        })

    }
    handleMoveRightClicked = () =>{
        console.log("handleMoveRightClicked is clicked!");
        //Copy selected orderItemsToKeep to temporary array
        let toCopy = [];
        for(let i = 0; i < this.state.toKeepCheckboxes.length; i++){
            if(this.state.toKeepCheckboxes[i] === true){
                toCopy.push(this.state.orderItemsToKeep[i]);
            }
        }
        console.log("toCopy", toCopy);

        //Filter out copied OrderItems
        let copyToKeep = this.state.orderItemsToKeep;
        for(let i = 0; i < toCopy.length; i++){
            //This could be refactored to a nicer implementation
            copyToKeep = copyToKeep.filter((mOrderItem) =>mOrderItem.id !== toCopy[i].id)
        }
        console.log("copyToKeep", copyToKeep);

        //Now set appropriate states
        let copyToUpdate = this.state.orderItemsToUpdate.concat(toCopy);
        let mToKeepCheckboxes = this.setCheckboxes(copyToKeep);
        let mToUpdateCheckboxes = this.setCheckboxes(copyToUpdate);
        this.setState({
            orderItemsToKeep: copyToKeep,
            orderItemsToUpdate: copyToUpdate,
            toKeepCheckboxes: mToKeepCheckboxes,
            toUpdateCheckboxes: mToUpdateCheckboxes
        })
    }
    setCheckboxes = (mOrderItems) =>{
        console.log("In setCheckBoxes");
        let numOfOrderItems = mOrderItems.length
        console.log("numOfOrderItems", numOfOrderItems);
        let mCheckboxes = [];
        for(let i = 0; i < numOfOrderItems; i++){
            mCheckboxes.push(false);
        }
        console.log("mCheckboxes", mCheckboxes);
        return mCheckboxes;
    }
    updateCheckboxes= (name, index) =>{
        console.log("In updateCheckboxes");
        console.log("name", name);
        console.log("index", index);
        let temp = []
        if(name === "toUpdate"){      
            console.log("name was toUpdate"); 
            temp = this.state.toUpdateCheckboxes
            if(temp[index] === true){
                temp[index] = false;
            }
            else{
                temp[index] = true;
            }
            this.setState({
                toUpdateCheckboxes: temp
            })
        }
        else if(name === "toKeep"){ 
            console.log("name was toKeep")
            temp = this.state.toKeepCheckboxes
            if(temp[index] === true){
                temp[index] = false;
            }
            else{
                temp[index] = true;
            }
            this.setState({
                toKeepCheckboxes: temp
            })
        }
    } 
    // Checks if either array is empty and returns appropriate array
    // At least one array should be nonempty.
    // This function is the same as the one in FoodDrinkView.js but
    // the last case should never occur (hopefully...)
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
    constructor(props){
        super(props)
        let mOrderItemsToKeep = this.collectOrderItems(this.props.billModelProps.bill,
            this.props.billModelProps.orderItems,
            this.props.getTempOrderItemsBillsProps().getValueOfKey(this.props.billModelProps.bill));
        this.state.orderItemsToKeep = mOrderItemsToKeep;
        console.log("mOrderItemsToKeep", mOrderItemsToKeep);
        this.state.toKeepCheckboxes = this.setCheckboxes(mOrderItemsToKeep);
    }
    render(){
        // Cory, feel free to put the button in any formation that makes sense
        
        return(
            <div>
                <button 
                id="cancelSplit"
                onClick={() => this.handleCancelSplitClicked()}
                >Cancel Split</button>
                <button 
                id="confirmSplit"
                onClick={() => this.handleConfirmSplitClicked()}
                >Confirm Split</button>
                <button 
                id="moveLeft"
                onClick={() => this.handleMoveLeftClicked()}
                >Move Left</button>
                <button 
                id="moveRight"
                onClick={() => this.handleMoveRightClicked()}
                >Move Right</button>
                <div id="firstbill">
                <SplitBillSubView 
                nameProps={"toKeep"}
                orderItemsProps={this.state.orderItemsToKeep}
                checkboxesProps={this.state.toKeepCheckboxes}
                updateCheckboxesProps={this.updateCheckboxes}
                />
                </div>
                <div id="newbill">
                <SplitBillSubView
                nameProps={"toUpdate"}
                orderItemsProps={this.state.orderItemsToUpdate}
                checkboxesProps={this.state.toUpdateCheckboxes}
                updateCheckboxesProps={this.updateCheckboxes}
                />
                </div>
            </div>
        )
    }
}
export default SplitBillView