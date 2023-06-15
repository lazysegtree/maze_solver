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

function MinHeap(comparator)
{
    console.warn("MinHeap may not work for objects other than arrays.");
    const parent = this;
    parent.cmp = comparator;
    parent.arr = new Array();
    parent.debug = true;

    parent.get_min = function(){
        return parent.arr[0];
    }

    parent.pop_min = function()
    {
        const res = parent.arr[0];
        parent.arr[0] = parent.arr.pop(); 
        let idx = 0;
        
        // while has left child = while not leaf
        while( idx*2+1 < parent.arr.length)
        {
            if(parent.debug) console.log("pop_min : working on idx = ", idx, " val = ", parent.arr[idx]);
            // may not have right child
            let lidx = idx*2+1; 
            let ridx = idx*2+2;
            let sm_idx = lidx; // smallest child index
            if(ridx < parent.arr.length && parent.cmp.is_smaller(parent.arr[ridx], parent.arr[sm_idx]))
            {
                sm_idx = ridx;
            }

            if(parent.cmp.is_smaller(parent.arr[idx], parent.arr[sm_idx]))
            {
                // parent is smaller
                break;
            }
            else
            {
                // swap
                [parent.arr[idx], parent.arr[sm_idx]] = [parent.arr[sm_idx], parent.arr[idx]]; 
                
                idx = sm_idx;
            }
        }
        return res;
    }
    
    parent.push = function(val)
    {
        parent.arr.push(val);
        let idx = parent.arr.length - 1;

        while(idx>0)
        {
            if(parent.debug) console.log("push : working on idx = ", idx, " val = ", parent.arr[idx]);
            // look at parent
            let pidx = Math.floor((idx-1)/2);
            if(parent.cmp.is_smaller(parent.arr[idx], parent.arr[pidx]))
            {
                // swap
                [parent.arr[idx], parent.arr[pidx]] = [parent.arr[pidx], parent.arr[idx]];

                idx = pidx;
            }   
            else
            {
                break;
            }

        }

        if(parent.debug){
            console.log("Array after insert : ", JSON.stringify(parent.arr));
        }
    }
    
    parent.is_empty = function()
    {
        return parent.size() === 0;
    }

    parent.size = function()
    {
        return parent.arr.length;
    }

    parent.to_sorted_arr = function(){
        const res = new Array();
        while(!parent.is_empty()){
            res.push(parent.pop_min());
        }
        return res;
    }

}


function ScalarArrCmp()
{
    const parent = this;
    parent.is_smaller = function(arr1, arr2)
    {
        for(let i = 0; i < Math.min(arr1.length, arr2.length); i++){
            if(arr1[i] !== arr2[i]) return (arr1[i] < arr2[i]);
        }
        return arr1.length < arr2.length;
    }
}

function set_info(info){
    info_elem.innerHTML = info;
}