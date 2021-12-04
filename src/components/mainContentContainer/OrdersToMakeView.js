import React from "react";
import {collection, getDocs, query} from "firebase/firestore";

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
        let items = ""
        let tableId = -1
        console.log("getOrders", ": ", "starting query...")
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            //console.log("getOrders", ": ", "document found!")
            this.state.orders.push(doc.get("orderItems"))
            //this.setState(test = doc.get("orderItems"))

            if (items === "") {
                items = doc.get("orderItems")
            } else {
                items += "\n" + doc.get("orderItems")
            }

            tableId = doc.get("tableID")
        });
        return this.state.orders
    }


    // this.state.orders.map((item, i) => <li key={i}>Test</li>
// {this.state.orders.map((order, index) => (
// <p>{index}: {order}</p>
// ))}
    render() {
        this.getOrders()
        return (
            <div>
                <ul>
                    {this.state.orders.map((item, i) => <li key={i}>Test</li>}
                </ul>
            </div>

        )
    }

}

export default OrdersToMakeView