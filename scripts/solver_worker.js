

function worker_main(){
    console.log("worker_main() run.");
    const parent = this;

    // Functions 
    function assert(cond, msg = ""){
        if(!cond){
            throw new Error("Assertion Error." + msg);
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

    function get_pixel_color(image_data, px, py){
        p_idx = 4* (py*image_data.width + px);
        const   r = image_data.data[p_idx], g = image_data.data[p_idx + 1], 
                b = image_data.data[p_idx + 2];
        //console.log("p_idx = ", p_idx, "r,b,g : ", r, " ", g, " ", b);
        return new Color(r,g,b);
    }

    function set_pixel_color(px, py, r,g,b, sz=1){
        parent.postMessage(["set_pixel_color", px, py, r,g,b, sz]);
    }


    // Constructor Functions : 
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

    function Color(r=0, g=0, b=0) {
        // black by default
        this.r = r, this.g = g, this.b = b, this.a = 255;
        const parent = this;
        this.is_equal = function(obj){
            return  parent.r === obj.r && parent.g === obj.g &&
                    parent.b === obj.b && parent.a === obj.a;
        }
    }

    
    const diff = [ [1,0], [-1,0], [0,1], [0,-1] ];
    // Global variables
    const visit_r = 60, visit_g = 200, visit_b = 250;
    const path_color = new Color(200, 50, 50);

    // Worker specifif 
    function bound_check(x, y, w, h){
        return x>=0 && y>=0 && x<w && y<h;
    };

    function get_black_dist(init_image_data){
        const w = init_image_data.width;
        const h = init_image_data.height;
        const black_dist = init_2d_arr(w, h, -1);
        bfs = new Queue(w*h, [-1,-1]);

        const visit_black = function(x, y, par_dist){
            black_dist[x][y] = par_dist + 1;
            bfs.push([x,y]);
        };

        // black bfs
        
        for(let x=0; x<w; x++){
            for(let y=0; y<h; y++){
                if(! st_color.is_equal(get_pixel_color(init_image_data, x, y))){
                    visit_black(x, y, -1);
                }
            }
        }


        while(!bfs.is_empty()){
            const [x, y] = bfs.pop();
            for(let i=0; i<diff.length; i++){
                const curx = x + diff[i][0];
                const cury = y + diff[i][1];
                if(bound_check(curx, cury, w, h) && black_dist[curx][cury] === -1){
                    // color should be st_color
                    assert(st_color.is_equal(get_pixel_color(init_image_data, curx, cury)));

                    visit_black(curx, cury, black_dist[x][y]);
                }
            }
        }

        return black_dist;

    };

   

    
    
    
    const bfs_solver = function (event)
    {
        const[ init_image_data, st_px, st_py, end_px, end_py] = event.data;
        
        console.log("BFS Solver Called with st : ", st_px, " ", st_py, " end : ", end_px, " ", end_py );
        
        w = init_image_data.width;
        h = init_image_data.height;

        st_color = get_pixel_color(init_image_data, st_px, st_py);
        end_color = get_pixel_color(init_image_data, end_px, end_py);

        const bfs = new Queue(w*h, [-1,-1]);
        const level = init_2d_arr(w, h, -1);

        


        const max_visit = w*h;
        let cur_visit = 0;
        visit = function(x, y, par_level){
            cur_visit ++;
            const b_diff = Math.floor( visit_b * (cur_visit / max_visit) );
            //console.log("visiting (", x, ", ", y, ") now.");
            level[x][y] = par_level+1;
            bfs.push([x,y]);

            if(cur_visit % 1000 == 0){
                //console.log(visit_r, visit_b, visit_g, b_diff);
            }

            set_pixel_color(x, y, visit_r, visit_g, visit_b - b_diff);

            // if we reach end, end here
            if(x === end_px && y === end_py){
                console.log("Reached the end.");
            }
        }

        visit(st_px, st_py, -1);

        let n_iter = 0;
        //const iter_lim = 100;

        // do bfs
        while(!bfs.is_empty() && level[end_px][end_py]==-1){
            n_iter++;
            //if(n_iter > iter_lim) break;
            if(n_iter % 5000 === 0){
                console.log("Doing " + n_iter + "th iteration.")
            }
            const [x,y] = bfs.pop();
            // color of x,y is guaranteed to be st_color

            for(let di=0; di<diff.length; di++){
                const   curx = x + diff[di][0],
                        cury = y + diff[di][1];

                // In bounds, not visited , same color as st_color
                if(bound_check(curx, cury, w, h) && level[curx][cury] === -1){
                    const cur_color = get_pixel_color(init_image_data, curx, cury);
                    if(st_color.is_equal(cur_color)){
                        visit(curx, cury, level[x][y]);
                    }
                }      
            }

        }

        // did we solve the maze
        if(level[end_px][end_py] === -1){
            parent.postMessage(["result", "Could not find a path from start to end."]);
            return;
        }
        else{
            parent.postMessage(["result", "Maze solved. Now tracing a path from start to end."]);
        }


        
        const black_dist = get_black_dist(init_image_data);
        
        // trace the path
        // from [end_px, end_py]
        let curx = end_px, cury = end_py;

        while(curx != st_px || cury != st_py){
            // color current pixel
            // maybe entire 3x3 pixel space arround it as well ?
            //console.log("Tracing : curx, cury : ", curx, " ", cury);
            set_pixel_color(curx, cury, path_color.r, path_color.g, path_color.b, 2);

            // look around and go with min level 
            let nextx = -1, nexty = -1;
            let mx_black_dist = 0;
            for(let i=0; i<diff.length; i++){
                const   newx = curx + diff[i][0], 
                        newy = cury + diff[i][1];
                if( bound_check(newx, newy, w, h) && 
                    st_color.is_equal(get_pixel_color(init_image_data, newx, newy)) && 
                    (level[newx][newy] == level[curx][cury] - 1) &&
                    black_dist[newx][newy] > mx_black_dist
                ){
                    nextx = newx;
                    nexty = newy;
                    mx_black_dist = black_dist[newx][newy];
                }
            }
            curx = nextx;
            cury = nexty;

            assert(curx != -1 && cury != -1);

            //console.log(curx, " ", cury, " ", nextx, " ", nexty);

        }
        
        parent.postMessage(["result", "Maze solved. Traced a path from start to end."]);

    }   

    const multilevel_bfs_solver = function (event){
        
        const[ init_image_data, st_px, st_py, end_px, end_py] = event.data;
        
        console.log("BFS Solver Called with st : ", st_px, " ", st_py, " end : ", end_px, " ", end_py );
        
        w = init_image_data.width;
        h = init_image_data.height;

        st_color = get_pixel_color(init_image_data, st_px, st_py);
        end_color = get_pixel_color(init_image_data, end_px, end_py);

    }

    onmessage = bfs_solver;

}

if(window != self){
    worker_main();
}