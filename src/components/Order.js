import React from "react";


class Order {
    orderNumber = 0;
    paid = false;
    totalBills = 1;
    orderItems = [];
    constructor(orderNumber){
        this.orderNumber = orderNumber;
    }
}
export default Order