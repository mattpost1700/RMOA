import React from "react";
import {collection, getDocs, query, where, orderBy} from "firebase/firestore";
import {forEach} from "react-bootstrap/ElementChildren";

//import OrdersToMakeSubView from "./OrdersToMakeSubView";

class OrdersToMakeView extends React.Component {

    state = {
        orders: [],
        test: ""
    }

    handleRefreshClick = async () => {
        console.log("handleRefreshClick", ": ", "clicked!")
        await this.getOrders()
        console.log("handleRefreshClick", ": ", "updated!")
        console.log("handleRefreshClick", ": ", this.state.orders)
    }

    getOrders = async () => {
        console.log("getOrders", ": ", "started")
        const q = query(collection(this.props.dbProps, "orders"), where("completed", "==", false), orderBy("createdAt")) // oldest ticket is higher
        //let tempString = "";
        //let mOrderItems = [];
        let mOrders = [];
        let mTableID = -1
        console.log("getOrders", ": ", "starting query...")
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log("getOrders", ": ", "document found!")
            console.log("current doc", doc);
            //this.state.orders.push(doc.get("orderItems"))
            //this.setState(test = doc.get("orderItems"))

            let temp = doc.get("orderItems")
            mTableID = [doc.get("tableID")]
            mOrders.push(...temp)
            mOrders.push("===================================")
            //mOrders = mOrders.concat({tableID:mTableID,
            //                        orderItems: mOrderItems})
        });
        console.log("mOrders", mOrders);
        this.setState({
            orders: mOrders
        })
    }

    handleItemClick = (i) => {
        let mOrders = this.state.orders
        mOrders.splice(i, 1); // remove i
        for(var i = 1; i < mOrders.length; i++) {
            if(mOrders[i-1] === "===================================" && mOrders[i] === "===================================") {
                mOrders.splice(i, 1);
                mOrders.splice(i-1, 1);
            }
        }

        this.setState({
            orders: mOrders
        })
    }

    render() {

        return (
            <div>
                <button id="refreshButton"
                        onClick={() => this.handleRefreshClick()}
                >Refresh
                </button>
                <ul>
                    {this.state.orders.map((order, i) =>
                        <li key={i} onClick={() => this.handleItemClick(i)}> {order}</li>)}
                    {/*<li key={i}><OrdersToMakeSubView*/}
                    {/*            orderProps={order}/></li>)}*/}
                </ul>
            </div>

        )
    }

}

export default OrdersToMakeView