import React from "react";
import {collection, getDocs, query} from "firebase/firestore";
import OrdersToMakeSubView from "./OrdersToMakeSubView";
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
        const q = query(collection(this.props.dbProps, "orders"))
        let tempString = "";
        let mOrderItems = [];
        let mOrders = [];
        let mTableID = -1
        console.log("getOrders", ": ", "starting query...")
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log("getOrders", ": ", "document found!")
            console.log("current doc", doc);
            //this.state.orders.push(doc.get("orderItems"))
            //this.setState(test = doc.get("orderItems"))

            tempString = doc.get("orderItems");
            mOrderItems = [...JSON.parse(tempString)];
            mTableID = doc.get("tableID");
            mOrders = mOrders.concat({tableID:mTableID,
                                    orderItems: mOrderItems}) 
        });
        console.log("mOrders", mOrders);
        this.setState({
            orders: this.state.orders.concat(mOrders)
        })
    }

    render() {
        
        return (
            <div>
                <button id="refreshButton"
                onClick={() => this.handleRefreshClick()}
                 >Refresh</button>
                <ul>
                    {this.state.orders.map((order, i) => 
                    <li key={i}><OrdersToMakeSubView
                                orderProps={order}/></li>)}
                </ul>
            </div>

        )
    }

}

export default OrdersToMakeView