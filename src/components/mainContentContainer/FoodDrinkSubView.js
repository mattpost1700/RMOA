import React from "react";
import "../../appCSS/order-sub-view.css";

class FoodDrinkSubView extends React.Component{

    handleRemoveClicked = (mOrderItem) =>{
        console.log("handleRemoveClicked is clicked");
        console.log("mOrderItem", mOrderItem);
        if(mOrderItem.confirmed === false){
            this.props.removeOrderItemProps(mOrderItem,this.props.modifyItemsCallbackProps);
        }
    }
    // Cory, for the list item in this component, I think putting a 
    // remove/delete button for each item and then disabling or
    // hiding the button for OrderItems that are already confirmed
    // is a good way to do this. You can put any symbol that makes
    // sense in place of "Remove" for the button label. I think
    // some sort of "X" will work.
    render(){
        console.log(this.props.orderItemsProps);
        return(
            <ol className={"orderList"}>
                {this.props.orderItemsProps.map((mOrderItem, index) =>(
                    <li className={"orderList__item"}
                        key={index}
                    >
                        <div className="orderList__wrapper">
                            <div className="orderList__details">
                                <span className={"orderList__name"}>{mOrderItem.name} - </span> <span className={"orderList__price"}> ${mOrderItem.price}</span>
                            </div>
                            <button className={"orderList__remove"}
                                onClick={() => this.handleRemoveClicked(mOrderItem)}
                            >&#10005;</button>
                        </div>
                    </li>
                ))}
            </ol>
        )
    }
}
export default FoodDrinkSubView