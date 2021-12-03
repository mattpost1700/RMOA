import React from "react";
import {collection, getDocs, query } from "firebase/firestore";

class OrdersToMakeView extends React.Component {
    state = {
        orders: [],
        test: ""
    }

    getOrders = async () => {
        console.log("getOrders", ": ", "started")
        const q = query(collection(this.props.dbProps, "orders"))
        let items = ""
        let tableId = -1
        console.log("getOrders", ": ", "starting query...")
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            this.state.orders.push(doc.get("orderItems"))
            //this.setState(test = doc.get("orderItems"))

            if(items === "") {
                items = doc.get("orderItems")
            } else { items += "\n" + doc.get("orderItems") }

            tableId = doc.get("tableID")
        });
    }

    render(){
        this.getOrders()
        return(
            <p>k{this.state.orders}</p>
        )
    }

}
export default OrdersToMakeView