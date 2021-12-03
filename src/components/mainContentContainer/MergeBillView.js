import React from "react";
import SplitBillSubView from "./SplitBillSubView";
import '../../appCSS/merge-bill-view.css';
class MergeBillView extends React.Component{
    state ={
        orderItemsFirstBill: [],
        orderItemsSecondBill: [],
        //An array of booleans
        firstBillCheckboxes: [],
        secondBillCheckboxes: [],
    }
    handleCancelMergeClicked = () =>{
        console.log("handleCancelMergeClicked is clicked!");
        // All of the state in this component should be cleared when 
        // going back to the previous view, so all changes should be
        // forgotten.
        this.props.backToOrderViewProps();
    }
    handleConfirmMergeClicked = () =>{
        console.log("handleConfirmMergeClicked is clicked!");
        //Both bills will contain all the OrderItems, send both
        // up the function despite either being empty
        
        
        console.log("orderItemsFirstBill", this.state.orderItemsFirstBill)
        console.log("orderItemsSecondBill", this.state.orderItemsSecondBill);
        this.props.moveMultipleOrderItemsToNewBillProps(this.props.firstBillModelProps.bill,
                                                        this.state.orderItemsFirstBill,
                                                        this.props.secondBillModelProps.bill,
                                                        this.state.orderItemsSecondBill);
        
        this.props.resetCheckboxesProps();
        this.props.backToOrderViewProps();
    }
    handleMoveLeftClicked = () =>{
        console.log("handleMoveLeftClicked is clicked!");
        //Copy selected orderItemsSecondBill to temporary array
        let toCopy = [];
        for(let i = 0; i < this.state.secondBillCheckboxes.length; i++){
            if(this.state.secondBillCheckboxes[i] === true){
                toCopy.push(this.state.orderItemsSecondBill[i]);
            }
        }
        console.log("toCopy", toCopy);

        //Filter out copied OrderItems from SecondBill
        let copySecondBill = this.state.orderItemsSecondBill;
        for(let i = 0; i < toCopy.length; i++){
            //This could be refactored to a nicer implementation
            copySecondBill = copySecondBill.filter((mOrderItem) =>mOrderItem.id !== toCopy[i].id)
        }
        console.log("copySecondBill", copySecondBill);

        //Now set appropriate states
        let copyFirstBill = this.state.orderItemsFirstBill.concat(toCopy);
        let mFirstBillCheckboxes = this.setCheckboxes(copyFirstBill);
        let mSecondBillCheckboxes = this.setCheckboxes(copySecondBill);
        this.setState({
            orderItemsFirstBill: copyFirstBill,
            orderItemsSecondBill: copySecondBill,
            firstBillCheckboxes: mFirstBillCheckboxes,
            secondBillCheckboxes: mSecondBillCheckboxes
        })

    }
    handleMoveRightClicked = () =>{
        console.log("handleMoveRightClicked is clicked!");
        //Copy selected orderItemsFirstBill to temporary array
        let toCopy = [];
        for(let i = 0; i < this.state.firstBillCheckboxes.length; i++){
            if(this.state.firstBillCheckboxes[i] === true){
                toCopy.push(this.state.orderItemsFirstBill[i]);
            }
        }
        console.log("toCopy", toCopy);

        //Filter out copied OrderItems
        let copyFirstBill = this.state.orderItemsFirstBill;
        for(let i = 0; i < toCopy.length; i++){
            //This could be refactored to a nicer implementation
            copyFirstBill = copyFirstBill.filter((mOrderItem) =>mOrderItem.id !== toCopy[i].id)
        }
        console.log("copyFirstBill", copyFirstBill);

        //Now set appropriate states
        let copySecondBill = this.state.orderItemsSecondBill.concat(toCopy);
        let mFirstBillCheckboxes = this.setCheckboxes(copyFirstBill);
        let mSecondBillCheckboxes = this.setCheckboxes(copySecondBill);
        this.setState({
            orderItemsFirstBill: copyFirstBill,
            orderItemsSecondBill: copySecondBill,
            firstBillCheckboxes: mFirstBillCheckboxes,
            secondBillCheckboxes: mSecondBillCheckboxes
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
        if(name === "firstBill"){      
            console.log("name was firstBill"); 
            temp = this.state.firstBillCheckboxes;
            if(temp[index] === true){
                temp[index] = false;
            }
            else{
                temp[index] = true;
            }
            this.setState({
                firstBillCheckboxes: temp
            })
        }
        else if(name === "secondBill"){ 
            console.log("name was secondBill")
            temp = this.state.secondBillCheckboxes;
            if(temp[index] === true){
                temp[index] = false;
            }
            else{
                temp[index] = true;
            }
            this.setState({
                secondBillCheckboxes: temp
            })
        }
    }
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
        super(props);
        console.log("In MergeBillView constructor!");
        let mFirstBill = this.props.firstBillModelProps.bill;
        let mSecondBill = this.props.secondBillModelProps.bill;
        let mOrderItemsFirstBill = this.collectOrderItems(mFirstBill,
            this.props.firstBillModelProps.orderItems,
            this.props.getTempOrderItemsBillsProps().getValueOfKey(mFirstBill));
        let mOrderItemsSecondBill = this.collectOrderItems(mSecondBill,
            this.props.secondBillModelProps.orderItems,
            this.props.getTempOrderItemsBillsProps().getValueOfKey(mSecondBill))
        console.log("mOrderItemsFirstBill", mOrderItemsFirstBill);
        console.log("mOrderItemsSecondBill", mOrderItemsSecondBill);
        this.state.orderItemsFirstBill = mOrderItemsFirstBill;
        this.state.orderItemsSecondBill = mOrderItemsSecondBill;
        this.state.firstBillCheckboxes = this.setCheckboxes(mOrderItemsFirstBill);
        this.state.secondBillCheckboxes = this.setCheckboxes(mOrderItemsSecondBill);
    }
    render(){
        let bill1 = this.props.firstBillModelProps.bill;
        let bill2 = this.props.secondBillModelProps.bill;


        return(
            <div className={"merge-bill"}>
                <div className="merge-bill__buttons">
                    <button className={"merge-bill__button"}
                    id="cancelMerge"
                    onClick={() => this.handleCancelMergeClicked()}
                    >Cancel Merge</button>
                    <button className={"merge-bill__button"}
                    id="confirmMerge"
                    onClick={() => this.handleConfirmMergeClicked()}
                    >Confirm Merge</button>

                </div>
                <div className="merge-bill__bills">
                <div id="firstBill" className={"merge-bill__first"}>
                <SplitBillSubView 
                nameProps={"firstBill"}
                orderItemsProps={this.state.orderItemsFirstBill}
                checkboxesProps={this.state.firstBillCheckboxes}
                updateCheckboxesProps={this.updateCheckboxes}
                billNum={bill1}

                />
                </div>
                    <div className="merge-bill__move-buttons">
                        <button className={"merge-bill__button merge-bill__left"}
                                id="moveLeft"
                                onClick={() => this.handleMoveLeftClicked()}
                        >&#60;&#60; Move Left</button>
                        <button className={"merge-bill__button merge-bill__right"}
                                id="moveRight"
                                onClick={() => this.handleMoveRightClicked()}
                        >Move Right &#62;&#62;</button>
                    </div>
                <div id="secondBill" className={"merge-bill__second"}>
                <SplitBillSubView
                nameProps={"secondBill"}
                orderItemsProps={this.state.orderItemsSecondBill}
                checkboxesProps={this.state.secondBillCheckboxes}
                updateCheckboxesProps={this.updateCheckboxes}
                billNum={bill2}
                />
                </div>
                </div>
            </div>
        )
    }
}
export default MergeBillView