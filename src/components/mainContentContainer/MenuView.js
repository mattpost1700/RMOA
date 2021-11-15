import React from "react";
import MockMenu from "../../testFiles/mockMenu";
import "../../appCSS/order-sub-view.css";

class MenuView extends React.Component{
    state = {
        menu: undefined
    }
    handleAddClicked = (mMenuItem) =>{
        console.log("handleAddClicked is clicked!");
        console.log("mMenuItem", mMenuItem);
        
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
            <ol className={"orderList"}>
                {this.state.menu.map((mMenuItem, index) =>(
                    <li className={"orderList__item"}
                    key={index}
                    >
                        <span className={"orderList__name"}>{mMenuItem.name} - </span> <span className={"orderList__price"}> ${mMenuItem.price}</span>
                    <button 
                    onClick={() => this.handleAddClicked(mMenuItem)}
                    >Add</button>
                    </li>
                ))}
            </ol>
        )
    }
}
export default MenuView