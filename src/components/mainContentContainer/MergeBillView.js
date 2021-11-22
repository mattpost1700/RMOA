import React from "react";

class MergeBillView extends React.Component{
    state ={
        orderItemsFirstBill: [],
        orderItemsSecondBill: [],
        //An array of booleans
        firstBillCheckboxes: [],
        secondBillCheckboxes: [],
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
        if(name === "firstBill"){      
            console.log("name was firstBill"); 
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
        else if(name === "secondBill"){ 
            console.log("name was secondBill")
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
    constructor(props){
        super(props);
        console.log("In MergeBillView constructor!");
        let mFirstBill = this.props.firstBillModelProps.bill;
        let mSecondBill = this.props.secondBillModelProps.bill;
        let mOrderItemsFirstBill  = this.props.firstBillModelProps.orderItems;
        let mOrderItemsSecondBill = this.props.secondBillModelProps.orderItems;
        let mTempOrderItemsFirstBill = this.props.getTempOrderItemsBillsProps().getValueOfKey(mFirstBill);
        let mTempOrderItemsSecondBill = this.props.getTempOrderItemsBillsProps().getValueOfKey(mSecondBill);
        if(mTempOrderItemsFirstBill !== undefined){
            mOrderItemsFirstBill = mOrderItemsFirstBill.concat(mTempOrderItemsFirstBill);
        }
        if(mTempOrderItemsSecondBill !== undefined){
            mOrderItemsSecondBill = mOrderItemsFirstBill.concat(mTempOrderItemsSecondBill);
        }
        this.state.orderItemsFirstBill = mOrderItemsFirstBill;
        this.state.orderItemsSecondBill = mOrderItemsSecondBill;
    }
    render(){
        return(
            <p>I'm a MergeBillView</p>
        )
    }
}
export default MergeBillView