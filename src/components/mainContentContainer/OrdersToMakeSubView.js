import React from "react";
import "../../appCSS/order-sub-view.css";

class OrdersToMakeSubView extends React.Component{

    render(){
        return(
            <ol className={"orderList"}>

                {
                    this.props.orderProps.orderItems.map((mOrderItem, index) =>(

                    <li className={"orderList__item"}
                    key={index}
                    >
                        <span className={"orderList__name"}>{mOrderItem.name} - </span> <span className={"orderList__price"}> ${mOrderItem.price}</span>
                    </li>
                ))}
            </ol>
        )
    }
}
export default OrdersToMakeSubView