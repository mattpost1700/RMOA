class Dictionary{
    values = {};
    constructor(){
        this.keys = [];
        this.values = {}
    }
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
    addKeyPair(n, obj){
        let nString = String(n);
        this.values[nString] = obj;
    }
    getValueOfKey(n){
        let nString = String(n);
        return this.values[nString];
    }
    addArrayElement(n, elem){
        let nString = String(n);
        this.values[nString].push(elem);
    }
}
export default Dictionary