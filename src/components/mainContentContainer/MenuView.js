import React from "react";
import MockMenu from "../../testFiles/mockMenu";
import "../../appCSS/menu-view.css";

class MenuView extends React.Component{
    state = {
        menu: undefined
    }
    handleAddClicked = (mMenuItem) =>{
        console.log("handleAddClicked is clicked!");
        console.log("mMenuItem", mMenuItem);
        let mBill = this.props.billModelProps.bill;
        console.log("mBill", mBill);
        this.props.addOrderItemsProps(mMenuItem, mBill,this.props.modifyItemsCallbackProps);
        this.props.addClickProps();
    }
    // Matt, this is a good place for a database call
    // Right now, mock Menu data will come from the testFiles
    setMenu = () =>{
        return MockMenu;
    }
    constructor(props){
        super(props);
        this.state.menu = this.setMenu();
    }
    render(){
        return(
            <ol className={"menuList"}>
                {this.state.menu.map((mMenuItem, index) =>(
                    <li className={"menuList__item"}
                        key={index}
                    >
                        <span className={"menuList__name"}>{mMenuItem.name} - </span> <span className={"menuList__price"}> ${mMenuItem.price}</span>
                        <button className={"menuList__add"}
                            onClick={() => this.handleAddClicked(mMenuItem)}
                        >&#43;</button>
                    </li>
                ))}
            </ol>
        )
    }
}
export default MenuView