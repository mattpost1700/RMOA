import React from "react";
import {collection, getDocs, query} from "firebase/firestore";
import OrdersToMakeSubView from "./OrdersToMakeSubView";
import "../../appCSS/orders-to-make-view.css";
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
            orders: mOrders
        })
    }

    render() {
        
        return (
            <div className={"order-to-make"}>
                <button id="refreshButton" className={"order-to-make__button"}
                onClick={() => this.handleRefreshClick()}
                 >Refresh</button>
                    <ul className={"order-to-make__orders"}>

                        {this.state.orders.map((order, i) =>
                            <div className="order-to-make__card-wrapper">
                                <div className="order-to-make__card">
                                    <p className="order-to-make__id">Table #{order['tableID']}</p>
                                    <li key={i}><OrdersToMakeSubView
                                        orderProps={order}/></li>
                                </div>
                                <button className="order-to-make__complete">Complete</button>
                            </div>
                        )}
                    </ul>
            </div>

        )
    }

}

export default OrdersToMakeView