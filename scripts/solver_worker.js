

function worker_main(){
    console.log("worker_main() run.");
    const parent = this;

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


    function get_pixel_color(image_data, px, py){
        p_idx = 4* (py*image_data.width + px);
        const   r = image_data.data[p_idx], g = image_data.data[p_idx + 1], 
                b = image_data.data[p_idx + 2];
        //console.log("p_idx = ", p_idx, "r,b,g : ", r, " ", g, " ", b);
        return new Color(r,g,b);
    }

    // working
    function set_pixel_color(px, py, color, sz=1){
        parent.postMessage(["set_pixel_color", px, py, color.r, color.g, color.b, sz]);
    }

    const visit_color = new Color(50, 200, 50);
    const path_color = new Color(200, 50, 50);
    
    
    onmessage = function (event)
    {
        console.log("Before import script");
        //importScripts("util.js", "config.js", "image.js");
        const[ init_image_data, st_px, st_py, end_px, end_py] = event.data;
        console.log("visit_color : ", visit_color);
        // canvas, st_px, st_py, end_px, end_py
        console.log("Solver Called with st : ", st_px, " ", st_py, " end : ", end_px, " ", end_py );
        
        w = init_image_data.width;
        h = init_image_data.height;

        st_color = get_pixel_color(init_image_data, st_px, st_py);
        end_color = get_pixel_color(init_image_data, end_px, end_py);

        // init bfs queue
        // Size is enough ?
        console.warn("BFS queue might not have sufficient size."); 
        
        const bfs = new Queue(w*h, [-1,-1]);
        const level = init_2d_arr(w, h, -1);
        const diff = [ [1,0], [-1,0], [0,1], [0,-1] ];

        bound_check = function(x, y){
            return x>=0 && y>=0 && x<w && y<h;
        };

        visit = function(x, y, par_level){
            //console.log("visiting (", x, ", ", y, ") now.");
            level[x][y] = par_level+1;
            bfs.push([x,y]);
            set_pixel_color(x, y, visit_color);

            // if we reach end, end here
            if(x === end_px && y === end_py){
                console.log("Reached the end.");
                bfs.clear();
            }
        }

        visit(st_px, st_py, -1);

        let n_iter = 0;
        //const iter_lim = 100;

        // do bfs
        while(!bfs.is_empty() && level[end_px][end_py]==-1){
            n_iter++;
            //if(n_iter > iter_lim) break;
            if(n_iter % 1000 === 0){
                console.log("Doing " + n_iter + "th iteration.")
            }
            const [x,y] = bfs.pop();
            // color of x,y is guaranteed to be st_color
            for(let di=0; di<diff.length; di++){
                const   curx = x + diff[di][0],
                        cury = y + diff[di][1];

                // In bounds, not visited , same color as st_color
                if(bound_check(curx, cury) && level[curx][cury] === -1){
                    const cur_color = get_pixel_color(init_image_data, curx, cury);
                    if(st_color.is_equal(cur_color)){
                        visit(curx, cury, level[x][y]);
                    }
                }      
            }
        }

        // trace the path
        // from [end_px, end_py]
        let curx = end_px, cury = end_py;

        while(curx != st_px || cury != st_py){
            // color current pixel
            // maybe entire 3x3 pixel space arround it as well ?
            console.log("Tracing : curx, cury : ", curx, " ", cury);
            set_pixel_color(curx, cury, path_color, 3);

            // look around and go with min level 
            let nextx = -1, nexty = -1;
            for(let i=0; i<diff.length; i++){
                const   newx = curx + diff[i][0], 
                        newy = cury + diff[i][1];
                if( bound_check(newx, newy) && 
                    st_color.is_equal(get_pixel_color(init_image_data, newx, newy)) && 
                    level[newx][newy] == level[curx][cury] - 1 
                ){
                    curx = newx;
                    cury = newy;
                    break;
                }
            }

        }

}   

}

if(window != self){
    worker_main();
}