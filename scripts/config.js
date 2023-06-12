CANVAS_WIDTH = 300
CANVAS_HEIGHT = 250
DEF_THRESH = 150;

// Global element variables that are used often
const main_canvas = document.getElementById("main-canvas");
const main_canvas_ctx = main_canvas.getContext("2d");
const overlay_canvas = document.getElementById("overlay-canvas");
const overlay_canvas_ctx = overlay_canvas.getContext("2d");

let image_data_saved = undefined;
let cur_pt_val_elem_x = undefined, cur_pt_val_elem_y = undefined;
const   st_pt_val_elem_x = document.getElementById("st-pt-val-x"),
        st_pt_val_elem_y = document.getElementById("st-pt-val-y"),
        end_pt_val_elem_x = document.getElementById("end-pt-val-x"),
        end_pt_val_elem_y = document.getElementById("end-pt-val-y");

const thresh_inp_range = document.getElementById("thresh-selector");
const thresh_inp_num = document.getElementById("thresh-value");

const info_elem = document.getElementById("info-content");


const visit_color = new Color(50, 200, 50);
const path_color = new Color(200, 50, 50);
const st_pt_color = new Color(200,50,50);
const end_pt_color = new Color(0,250,0);