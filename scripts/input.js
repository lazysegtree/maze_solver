function set_pt_select_listener(){
    if (typeof this.listener_set === "undefined"){
        this.listener_set = true;
        // set listener
        console.log("Setting listener for point select");

        main_canvas.addEventListener("click", function(event){
            const bounding = main_canvas.getBoundingClientRect();
            const x = event.clientX - bounding.left;
            const y = event.clientY - bounding.top;
            cur_pt_val_elem.innerHTML = "location : (x = " + x + ", y=" + y + ")";
            console.log("Click detected on x = ", x, ", y = ", y);
        });

    }
}

function init_btn(){
    
    
    // Start and end buttons
    document.getElementById("st-pt-btn").onclick = function (){
        set_pt_select_listener();
        cur_pt_val_elem = document.getElementById("st-pt-val");
    };
    
    document.getElementById("end-pt-btn").onclick = function (){
        set_pt_select_listener();
        cur_pt_val_elem = document.getElementById("end-pt-val");
    };
}

function init_thresh_selector(){

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
        }
        const reader = new FileReader();
        reader.addEventListener("load", function(event){
            console.log("Image Loaded src = ", event.target.result);
            //img = document.getElementById("out-image");
            img = new Image();
            img.src = event.target.result;
            img.height = main_canvas.height;
            img.width  = main_canvas.width ;

            img.onload = function(){
                main_canvas_ctx.drawImage(img, 0, 0, img.width, img.height);
            }
        });
        reader.readAsDataURL(file);

    });
}