class Dictionary{
    //keys should be primatives
    values = {};
    constructor(dict){
        if(dict !== undefined){
        this.values = this._recursiveCopy(dict.values);
        }
        else{
            this.values = {};
        }
    }
    // Use this function first to detemine the logic
    // needed. Other function do no error checking.
    isKey(n){
       let nString = String(n);
       let check = this.values[nString];
       if(check !== undefined){
           return true;
       }
       else{
           return false;
       }
    }
    //This will overwrite previous values, which is good
    addKeyPair(n, obj){
        let nString = String(n);
        this.values[nString] = this._recursiveCopy(obj);
    }
    //These will all be strings, use parseInt to get integer value
    getAllKeys(){
        return Object.keys(this.values);
    }
    //Returns undefined if n is not any key
    getValueOfKey(n){
        let nString = String(n);
        return this.values[nString];
    }
    addArrayElement(n, elem){
        let nString = String(n);
        // Any array that was added would have been
        // deepcopied, so safe to push a deepcopied elem
        if(typeof elem === "object"){
        this.values[nString].push(this._recursiveCopy(elem));
        }
    }
    removeKeyPair(n){
        let nString = String(n);
        delete this.values[n];
    }
    _recursiveCopy = (elem) =>{
        if(typeof elem !== "object"){
            return elem;
        }
        else if(typeof elem === "object"){
            if(Array.isArray(elem)){
                //console.log("Object was an array");
                return elem.map((elem) =>
                    this._recursiveCopy(elem))
            }
            else{
                
                return Object.keys(elem).reduce(
                    (r,k) =>(r[k] = this._recursiveCopy(elem[k]),r),{});
            }
        }

    }
    
}
export default Dictionary