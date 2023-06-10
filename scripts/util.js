function assert(cond){
    if(!cond){
        throw new Error("Assertion Error" + cond + " is false");
    }
}