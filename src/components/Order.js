import React from "react";


class Order {
    orderID = 0;
    paid = false;
    totalBills = 1;
    orderItems = [];
    constructor(orderID){
        this.orderID = orderID;
    }
}
export default Order