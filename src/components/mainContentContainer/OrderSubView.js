import React from "react";

class OrderSubView extends React.Component{
    render(){
        
        return(
            <ol>
                {this.props.billProps.map((mOrderItem, index) =>(
                    <li>
                        <p>{mOrderItem.name}</p> <p> {mOrderItem.price}</p>
                    </li>
                ))}
            </ol>
            
        )
    }
}
export default OrderSubView