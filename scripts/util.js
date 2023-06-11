function assert(cond, msg = ""){
    if(!cond){
        throw new Error("Assertion Error." + msg);
    }
}

function Color(r=0, g=0, b=0) {
    // black by default
    this.r = r, this.g = g, this.b = b, this.a = 255;
    const parent = this;
    this.is_equal = function(obj){
        return  parent.r === obj.r && parent.g === obj.g &&
                parent.b === obj.b && parent.a === obj.a;
    }
}



function memset(arr, val){
    for(let i=0; i<arr.length; i++){
        arr[i] = val;
    }
}

function init_arr(len, def_val){
    arr = new Array(len);
    memset(arr, def_val);
    return arr;
}

function init_2d_arr(n, m, def_val){
    arr = new Array(n);
    for( let i=0; i<arr.length; i++){
        arr[i] = new Array(m);
        memset(arr[i], def_val);
    }
    return arr;
}

function Queue(max_size, def_val = 0){
    let parent = this;
    this.max_size = max_size;
    this.arr = init_arr(max_size, def_val);
    this.rear = -1;
    this.front = 0;

    this.is_empty = function(){
        return parent.front > parent.rear ;
    }

    this.size = function(){
        return parent.rear - parent.front + 1;
    }

    this.push = function(elem){
        assert(parent.rear + 1 < parent.max_size);
        parent.rear ++;
        parent.arr[parent.rear] = elem;
    }

    this.pop = function(){
        assert(!parent.is_empty());
        const ret = parent.arr[parent.front];
        parent.front++;
        return ret;
    }

    this.clear = function(){
        parent.rear = -1;
        parent.front = 0;
    }

}

function set_info(info){
    info_elem.innerHTML = info;
}