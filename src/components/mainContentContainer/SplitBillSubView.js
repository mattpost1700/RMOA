import React from "react";
import SplitBillView from "./SplitBillView";
import '../../appCSS/split-bill-sub-view.css';

class SplitBillSubView extends React.Component{


    handleCheckboxClicked = (index) =>{
        console.log("handleCheckboxClicked has been clicked!");
        this.props.updateCheckboxesProps(this.props.nameProps, index);
    }


    render(){
        console.log(this.props.orderItemsProps);
        let billNum = this.props.billNum;
        // The index of the orderItemsProps should line up with
        // the index of the related checkbox boolean value
        return(
            <div className="split-bill-sub-wrapper">
            <div className="split-bill-sub">
                <p className={"split-bill-sub__order"}>Order #{billNum}</p>
                <ol className={"split-bill-sub__items"}>
                    {this.props.orderItemsProps.map((mOrderItem, index) =>(
                        <li
                        className={"split-bill-sub__item"}
                        key={index}
                        >
                            <label htmlFor={"checkbox-" + billNum + "-" + index}>
                            <span className={"split-bill-sub__details"}>{mOrderItem.name} - </span> <span>${mOrderItem.price}</span>
                            </label>
                                <input
                                    id={"checkbox-" + billNum + "-" + index}
                                className={"split-bill-sub__checkbox"}
                                type="checkbox"
                                checked={this.props.checkboxesProps[index]}
                                onChange={() => this.handleCheckboxClicked(index)}
                            />
                        </li>
                    ))}

                </ol>

            </div>

            </div>
        )
    }
}
export default SplitBillSubView