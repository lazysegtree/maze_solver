

function memset(arr, val){
    for(let i=0; i<arr.length; i++){
        arr[i] = val;
    }
}

function init_arr(len, def_val){
    arr = new Array(len);
    memset(arr, def_val);
}

function init_2d_arr(n, m, def_val){
    arr = new Array(n);
    for( let i=0; i<arr.length; i++){
        arr[i] = new Array(m);
        memset(arr[i], def_val);
    }
}

function Queue(max_size){
    let parent = this;
    this.max_size = max_size;
    this.arr = init_arr(max_size, 0);
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

}


function solve(canvas, st_px, st_py, end_px, end_py){
    canvas_ctx = canvas.getContext("2d");
    
    // check st and end have same pixel color

    // init bfs queue 

    // do bfs

    // trace the path
}