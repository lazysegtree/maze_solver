


// get a new thresholded according to image_data_saved image_data in place
function get_thresh(canvas_ctx, src_image_data, thresh){
    res = canvas_ctx.createImageData(src_image_data); // copy only width and height

    data = src_image_data.data;
    // fill res according to src_image_data and thresh
    for(let i=0; i+3 < data.length; i+=4){
        const r = data[i], g = data[i+1], b = data[i+2];
        const gray_val = 0.299*r + 0.587*g + 0.114*b;
        if(gray_val >= thresh){
            res.data[i] = 255;
            res.data[i+1] = 255;
            res.data[i+2] = 255;
            
        }
        // else 0 by default
        // res.data[i+3] = 1; // alpha value
        res.data[i+3] = 255;
    }
    return res;
}

// read image data and thresh selector input and do the job
function apply_thresh(){
    //return;
    // return if not image not loaded yet
    if(image_data_saved === undefined){
        return;
    }

    console.log("apply_thresh() called.")
    thresh = thresh_inp_num.value;
    new_image_data = get_thresh(main_canvas_ctx, image_data_saved, thresh);
    main_canvas_ctx.putImageData(new_image_data, 0, 0);
}

// working
function set_pixel_color(canvas_ctx, px, py, color){
    console.log(" px ", px, " py ", py, " color : ", color);
    canvas_ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b},  255)`;
    canvas_ctx.fillRect(px, py, 1, 1);
}



function get_pixel_color(image_data, px, py){
    p_idx = 4* (py*image_data.width + px);
    const   r = image_data.data[p_idx], g = image_data.data[p_idx + 1], 
            b = image_data.data[p_idx + 2];
    console.log("p_idx = ", p_idx, "r,b,g : ", r, " ", g, " ", b);
    return new Color(r,g,b);
}
