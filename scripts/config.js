CANVAS_WIDTH = 600
CANVAS_HEIGHT = 400
DEF_THRESH = 150;

// Global element variables that are used often
const main_canvas = document.getElementById("main-canvas");
const main_canvas_ctx = main_canvas.getContext("2d");
let image_data_saved = undefined;
let cur_pt_val_elem = undefined;

const thresh_inp_range = document.getElementById("thresh-selector");
const thresh_inp_num = document.getElementById("thresh-value");