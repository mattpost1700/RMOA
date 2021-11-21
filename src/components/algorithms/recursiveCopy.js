function recursiveCopy(elem){
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
export default recursiveCopy