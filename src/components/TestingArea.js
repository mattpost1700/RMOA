import React from "react";
import Dictionary from "./dataStructures/Dictionary"
class TestingArea extends React.Component{
    runTestOne = () =>{
        let dict = new Dictionary();
        let keyInDict = dict.isKey(1);
        console.log("keyInDict should be false -->", keyInDict);
        let obj1 = {name:"Ryan",
            age: 32}
        let num1 = 21;
        console.log("obj1", obj1);
        console.log("num1", num1);
        dict.addKeyPair(num1, obj1);
        console.log("dict", dict);
        let obj2 = dict.getValueOfKey(21);
        console.log("obj2", obj2);
        let obj3 = dict.getValueOfKey(22);
        console.log("obj3", obj3);
        let dict2 = new Dictionary();
        let arr1 = [{name:"Matt", age:"12"}, {name:"Bob", age:"23"}]
        dict2.addKeyPair(99, arr1);
        console.log(dict2);
        dict2.addArrayElement(99, obj1);
        console.log(dict2);
    }
    render(){
        return(
            <div>
            <p>In TestingArea</p>
            <button
            id="test1"
            onClick={() => this.runTestOne()}
            >Run Test1</button>
            </div>
        )
    }
}
export default TestingArea