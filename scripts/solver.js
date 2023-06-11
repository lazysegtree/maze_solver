


function solve(canvas, st_px, st_py, end_px, end_py){
    console.log("Solver Called with st : ", st_px, " ", st_py, " end : ", end_px, " ", end_py );
    canvas_ctx = canvas.getContext("2d");
    
    init_image_data = canvas_ctx.getImageData(0,0,canvas.width, canvas.height);

    w = init_image_data.width;
    h = init_image_data.height;

    // check st and end have same pixel color
    st_color = get_pixel_color(init_image_data, st_px, st_py);
    end_color = get_pixel_color(init_image_data, end_px, end_py);

    if( ! st_color.is_equal(end_color)){
        alert("Start and End point should have same color.");
        return;
    }

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
        console.log("visiting (", x, ", ", y, ") now.");
        level[x][y] = par_level+1;
        bfs.push([x,y]);
        set_pixel_color(canvas_ctx, x, y, visit_color);
    }

    visit(st_px, st_py, -1);

    let n_iter = 0;
    //const iter_lim = 100;

    // do bfs
    while(!bfs.is_empty()){
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

    function color_around(x, y, color, sz = 1){
        for(let px=x-sz; px<=x+sz; px++){
            for(let py=y-sz; py<=y+sz; py++){
                if( bound_check(px, py) && 
                    st_color.is_equal(get_pixel_color(init_image_data, px, py)) 
                )
                {
                    set_pixel_color(canvas_ctx, px, py, color);
                }
            }
        }
    }

    // trace the path
    // from [end_px, end_py]
    let curx = end_px, cury = end_py;

    while(curx != st_px && cury != end_py){
        // color current pixel
        // maybe entire 3x3 pixel space arround it as well ?
        color_around(curx, cury, path_color);

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