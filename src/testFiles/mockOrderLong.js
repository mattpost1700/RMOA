import Order from "../components/Order";

//Test a bill with many items to see how overflow is handled
//in OrderView.js

const MockOrder = {
    orderID : 9999,
    paid : false,
    totalBills : 2,
    orderItems : [
        {
            id: 1001,
            name : "Junk 1",
            price : 1.11,
            bill : 1,
        },
        {
            id: 1002,
            name : "Junk 2",
            price : 1.11,
            bill : 1,
        },
        {
            id: 1003,
            name : "Junk 3",
            price : 1.11,
            bill : 1,
        },
        {
            id: 1004,
            name : "Junk 4",
            price : 1.11,
            bill : 1,
        },
        {
            id: 1005,
            name : "Junk 5",
            price : 1.11,
            bill : 1,
        },
        {
            id: 1006,
            name : "Junk 6",
            price : 1.11,
            bill : 1,
        },
        {
            id: 1007,
            name : "Junk 7",
            price : 1.11,
            bill : 1,
        },
        {
            id: 1008,
            name : "Junk 8",
            price : 1.11,
            bill : 1,
        },
        {
            id: 1009,
            name : "Junk 9",
            price : 1.11,
            bill : 1,
        },
        {
            id: 1010,
            name : "Junk 10",
            price : 1.11,
            bill : 1,
        },
        {
            id: 1011,
            name : "Junk 11",
            price : 1.11,
            bill : 1,
        },
        {
            id: 1012,
            name : "Junk 12",
            price : 1.11,
            bill : 1,
        },
        {
            id: 1013,
            name : "Junk 13",
            price : 1.11,
            bill : 1,
        },
        {
            id: 1014,
            name : "Junk 14",
            price : 1.11,
            bill : 1,
        },
        {
            id: 1015,
            name : "Junk 15",
            price : 1.11,
            bill : 1,
        },
        {
            id: 1016,
            name : "Junk 16",
            price : 1.11,
            bill : 1,
        },
        {
            id: 1017,
            name : "Junk 1",
            price : 1.11,
            bill : 2,
        },
        {
            id: 1018,
            name : "Junk 2",
            price : 1.11,
            bill : 2,
        },
        {
            id: 1019,
            name : "Junk 3",
            price : 1.11,
            bill : 2,
        },
        {
            id: 1020,
            name : "Junk 4",
            price : 1.11,
            bill : 2,
        },
        {
            id: 1021,
            name : "Junk 5",
            price : 1.11,
            bill : 2,
        },
        {
            id: 1022,
            name : "Junk 6",
            price : 1.11,
            bill : 2,
        },
        {
            id: 1023,
            name : "Junk 7",
            price : 1.11,
            bill : 2,
        },
        {
            id: 1024,
            name : "Junk 8",
            price : 1.11,
            bill : 2,
        },
        {
            id: 1025,
            name : "Junk 9",
            price : 1.11,
            bill : 2,
        },
        {
            id: 1026,
            name : "Junk 10",
            price : 1.11,
            bill : 2,
        },
        {
            id: 1028,
            name : "Junk 11",
            price : 1.11,
            bill : 2,
        },
        {
            id: 1029,
            name : "Junk 12",
            price : 1.11,
            bill : 2,
        },
        {
            id: 1030,
            name : "Junk 13",
            price : 1.11,
            bill : 2,
        },
        {
            id: 1031,
            name : "Junk 14",
            price : 1.11,
            bill : 2,
        },
        {
            id: 1032,
            name : "Junk 15",
            price : 1.11,
            bill : 2,
        },
        {
            id: 1033,
            name : "Junk 16",
            price : 1.11,
            bill : 2,
        },
    ]    
}
export default MockOrder