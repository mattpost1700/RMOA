import Ract from "react";

import MenuItem from "./MenuItem";
class OrderItem{
    id = 0;
    name = "";
    price = 0.00;
    bill = 0;
    constructor(menuItem){
        this.name = menuItem.name;
        this.price = menuItem.price;
    }
}
export default OrderItem