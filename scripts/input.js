function draw_st_end_points(){
    
    overlay_canvas_ctx.clearRect(0, 0, overlay_canvas.width, overlay_canvas.height);

    const   st_px = st_pt_val_elem_x.innerHTML, st_py = st_pt_val_elem_y.innerHTML;
            end_px = end_pt_val_elem_x.innerHTML, end_py = end_pt_val_elem_y.innerHTML;
    
    if(st_px != "" && st_py != ""){
        set_pixel_color(overlay_canvas_ctx, st_px+2, st_py+2, st_pt_color, 5);
    }
    
    if(end_px != "" && end_py != ""){
        set_pixel_color(overlay_canvas_ctx, end_px+2, end_py+2, end_pt_color, 5);
    }
}

function set_pt_select_listener(){
    if (typeof this.listener_set === "undefined"){
        this.listener_set = true;
        // set listener
        console.log("Setting listener for point select");

        overlay_canvas.addEventListener("click", function(event){
            const bounding = overlay_canvas.getBoundingClientRect();
            const x = Math.floor( event.clientX - bounding.left);
            const y = Math.floor( event.clientY - bounding.top);
            console.log("Click detected on x = ", x, ", y = ", y);

            cur_pt_val_elem_x.innerHTML = x;
            cur_pt_val_elem_y.innerHTML = y;

            // Draw both 
            draw_st_end_points();
        });

    }
}

function init_btn(){
    
    
    // Start and end buttons
    document.getElementById("st-pt-btn").onclick = function (){
        set_info("Select starting point now.");
        set_pt_select_listener();
        cur_pt_val_elem_x = st_pt_val_elem_x;
        cur_pt_val_elem_y = st_pt_val_elem_y;
    };
    
    document.getElementById("end-pt-btn").onclick = function (){
        set_info("Select ending point now.");
        set_pt_select_listener();
        cur_pt_val_elem_x = end_pt_val_elem_x;
        cur_pt_val_elem_y = end_pt_val_elem_y;
    };

    // Solve and reset button
    document.getElementById("reset-btn").onclick = function (){
        // change the thresh slider to default value
        // maybe set choosen point A and choosent point B none
        
        thresh_inp_range.value = DEF_THRESH;
        thresh_inp_range.dispatchEvent(new Event('input', {}));
    };

    document.getElementById("solve-btn").onclick = handle_solve;

}


function init_thresh_selector(){
    thresh_inp_range.min = 0, thresh_inp_range.max = 255;
    thresh_inp_num.min = 0, thresh_inp_num.max = 255;
    thresh_inp_num.value = DEF_THRESH, thresh_inp_range.value = DEF_THRESH;

    thresh_inp_num.addEventListener("input", function(event){
        thresh_inp_range.value = thresh_inp_num.value;
        apply_thresh();
    });
    
    thresh_inp_range.addEventListener("input", function(event){
        thresh_inp_num.value = thresh_inp_range.value;
        apply_thresh();
    });

}

function init_file_inp(){
    file_inp_elem = document.getElementById("file-inp-elem");
    file_inp_elem.addEventListener("change", function(event){
        file = event.target.files[0];

        // todo add extension check
        if(!file.type || 
            (file.type && !file.type.startsWith('image/'))
        ){
            alert("Please provide an image file.");
            return;
        }
        const reader = new FileReader();
        reader.addEventListener("load", function(event){
            console.log("Image Loaded src = ", event.target.result);
            img = new Image();
            img.src = event.target.result;
            img.height = main_canvas.height;
            img.width  = main_canvas.width ;

            img.onload = function(){
                main_canvas_ctx.drawImage(img, 0, 0, img.width, img.height);
                
                // also create backup of imagedata
                console.log("Saving Image Data");
                image_data_saved = main_canvas_ctx.getImageData(0, 0, main_canvas.width, main_canvas.height);
                // apply thresholding
                apply_thresh();
            }
        });
        reader.readAsDataURL(file);

    });
}