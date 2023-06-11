


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

    if(image_data_saved === undefined){
        set_info("Please provide and image first.");
        return;
    }

    const   st_px = st_pt_val_elem_x.innerHTML, st_py = st_pt_val_elem_y.innerHTML;
            end_px = end_pt_val_elem_x.innerHTML, end_py = end_pt_val_elem_y.innerHTML;
    
    if(st_px === "" || st_py === "" || end_px === "" || end_py === ""){
        
        set_info("Select starting and ending points first.");
        return;
    }

    init_image_data = main_canvas_ctx.getImageData(0, 0, main_canvas.width, main_canvas.height);

    st_color = get_pixel_color(init_image_data, st_px, st_py);
    end_color = get_pixel_color(init_image_data, end_px, end_py);
    if( ! st_color.is_equal(end_color)){
        set_info("Start and End pixel should have same color.");
        return;
    }

    const myWorker = new Worker(
        URL.createObjectURL(new Blob(
                ["("+worker_main.toString()+")()"], 
                {type: 'text/javascript'}
            )
        )
    );

    set_info("Started solving the maze.")

    myWorker.postMessage([ init_image_data, 
        Math.floor(Number(st_px)), 
        Math.floor(Number(st_py)), 
        Math.floor(Number(end_px)), 
        Math.floor(Number(end_py)) ]);

    myWorker.onmessage = function(event){
        if(event.data[0] === "set_pixel_color"){
            set_pixel_color(main_canvas_ctx, event.data[1], event.data[2], 
                            new Color( event.data[3], event.data[4], event.data[5]), 
                            event.data[6] );
        }
        else if(event.data[0] === "result"){
            set_info(event.data[1]);
        }
    };
}




init();