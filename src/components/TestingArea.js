import React from "react";
import Dictionary from "./dataStructures/Dictionary"
class TestingArea extends React.Component{
    runTestOne = () =>{
        console.log("In Test One");
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
        let arr1 = [{name:"Matt", age:12}, {name:"Bob", age:23}]
        dict2.addKeyPair(99, arr1);
        console.log("dict2", dict2);
        let dict2b = new Dictionary(dict2);
        dict2b.addArrayElement(99, obj1);
        console.log("dict2b", dict2b);
        //Try adding an array and element directly
        let dict3 = new Dictionary();
        dict3.addKeyPair(101, []);
        dict3.addArrayElement(101, {name:"Ralph", age:80});
        console.log("dict3", dict3);
        let dict4 = new Dictionary();
        dict4.addKeyPair(21, {checked:false});
        console.log("dict4", dict4);
        let dict5 = dict4;
        console.log("dict5", dict5);
    }
    runTestTwo = () =>{
        console.log("In Test Two");
        let dict1 = new Dictionary();
        let dict2 = new Dictionary();
        console.log("dict1 === dict2 should be false -->",dict1 === dict2);
        let obj1 = {name:"Ryan", age:33};
        let obj2 = {name:"Randy", age:36};
        let obj3 = {name:"Doby", age:8};
        let obj4 = {name:"Maggie", age:6};
        dict1.addKeyPair(10,obj1);
        console.log("dict1", dict1);
        console.log("obj1", obj1);
        obj1.name = "Ralph";
        console.log("dict1", dict1);
        console.log("obj1", obj1);

        dict2.addKeyPair(10, obj2);
        console.log("dict2", dict2);
        let dict3 = new Dictionary(dict2);
        dict2.addKeyPair(11, obj3);
        console.log("dict2", dict2);
        console.log("dict3", dict3);
        obj2.name = "Deb";
        console.log("dict3", dict3);
        console.log("obj2", obj2);
    }
    runTestThree = () =>{
        //Testing deep copy options
        let arr1 = [];
        let arrsub1 = ["red", "blue", "green"];
        let arrsub2 = ["light", "dark", "gray"];
        arr1.push([arrsub1]);
        arr1.push([arrsub2]);
        console.log(arr1);
        arrsub2[1] = "black";
        console.log(arrsub2);
        console.log(arr1);

        let nestedObj = {lv1:{name:"Job", age:"13"},
                        lv2:{name:"Rob", age:"14"}}
        console.log("nestedObj", nestedObj);
        let objOther = {...nestedObj};
        console.log("objOther", objOther)
        nestedObj.lv1.name = "Peter";
        console.log("nestedObj", nestedObj);
        console.log("objOther", objOther)
        let num1 = 25;
        
        let objDeep1 = this.recursiveCopy(num1);
        let objDeep2 = this.recursiveCopy(nestedObj);
        nestedObj.lv1.name = "Jacob";
        console.log(objDeep1);
        console.log(objDeep2);

        let arrDeep1 = this.recursiveCopy(arr1);
        console.log("arr1", arr1);
        arrsub2[1] = "surf";
        console.log("arrsub2", arrsub2);
        console.log("arr1", arr1);
        console.log("arrDeep1", arrDeep1);
    }
    recursiveCopy = (elem) =>{
        if(typeof elem !== "object"){
            return elem;
        }
        else if(typeof elem === "object"){
            if(Array.isArray(elem)){
                //console.log("Object was an array");
                return elem.map((elem) =>
                    this.recursiveCopy(elem))
            }
            else{
                
                return Object.keys(elem).reduce(
                    (r,k) =>(r[k] = this.recursiveCopy(elem[k]),r),{});
            }
        }

    }
    render(){
        return(
            <div>
            <p>In TestingArea</p>
            <button
            id="test1"
            onClick={() => this.runTestOne()}
            >Run Test1</button>
            <button
            id="test2"
            onClick={() => this.runTestTwo()}
            >Run Test2</button>
            <button
            id="test3"
            onClick={() => this.runTestThree()}
            >Run Test3</button>
            </div>
        )
    }
}
export default TestingArea