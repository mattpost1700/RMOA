import React from "react";
import "../../appCSS/order-sub-view.css";
// I believe this class can be purely a view.
// I think all the logic can be place in the above class.
class OrderSubView extends React.Component{
    render(){
        return(
            <ol className={"orderList"}>
                {this.props.billProps.map((mOrderItem, index) =>(
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
export default OrderSubView