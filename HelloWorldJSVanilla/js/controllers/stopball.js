import objapp from "../main.js";

export default document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        if (objapp.app){
            objapp.control("stop");
        }else{
            objapp.control("start");
        }
    }
}