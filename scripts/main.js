


function init(){
    // Initialize Canvas
    main_canvas.width = CANVAS_WIDTH
    main_canvas.height = CANVAS_HEIGHT

    // initialize input elements
    init_btn();
    init_thresh_selector();
    init_file_inp();
    
}

function handle_solve(){
    const   st_px = st_pt_val_elem_x.innerHTML, st_py = st_pt_val_elem_y.innerHTML;
            end_px = end_pt_val_elem_x.innerHTML, end_py = end_pt_val_elem_y.innerHTML;
    
    if(st_px === "" || st_py === "" || end_px === "" || end_py === ""){
        console.log("points not defined");
        alert("Select starting and ending points first");
        return;
    }

    solve(main_canvas, 
        Math.floor(Number(st_px)), 
        Math.floor(Number(st_py)), 
        Math.floor(Number(end_px)), 
        Math.floor(Number(end_py)));
}




init();