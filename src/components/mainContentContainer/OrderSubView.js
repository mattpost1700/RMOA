import React from "react";

// I believe this class can be purely a view.
// I think all the logic can be place in the above class.
class OrderSubView extends React.Component{
    render(){
        return(
            <ol>
                {this.props.billProps.map((mOrderItem, index) =>(
                    <li
                    key={index}
                    >
                        <p>{mOrderItem.name}</p> <p> {mOrderItem.price}</p>
                    </li>
                ))}
            </ol>
            
        )
    }
}
export default OrderSubView