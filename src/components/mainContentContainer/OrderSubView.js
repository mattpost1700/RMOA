import React from "react";
import '../../appCSS/order-sub-view.css';

class OrderSubView extends React.Component{
    render(){
        
        return(
            <ol className={"orderList"}>
                {this.props.billProps.map((mOrderItem, index) =>(
                    <li className={"orderList__item"}>
                        <span className={"orderList__name"}>{mOrderItem.name} - </span> <span className={"orderList__price"}> ${mOrderItem.price}</span>
                    </li>
                ))}
            </ol>
            
        )
    }
}
export default OrderSubView