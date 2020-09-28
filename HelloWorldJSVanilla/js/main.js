"use strict";
import docReady from './core/core.js';
import './controllers/stopball.js';

const objapp = {
    app: false,
    inc: {},
    appfunc: function (el) {
        // DOM is loaded and ready for manipulation here
        if (Object.keys(this.inc).length == 0) {
            this.inc.x = 15 * (Math.round(Math.random()) ? 1 : -1);
            this.inc.y = 15 * (Math.round(Math.random()) ? 1 : -1);
        }

        return function() {
            let x = el.style.left ? parseInt(el.style.left, 10) : 350;
            let y = el.style.top ? parseInt(el.style.top, 10) : 400;
    
            el.style.left = x + objapp.inc.x + "px";
            el.style.top = y + objapp.inc.y + "px";
    
            //Detect if we reach X coordinates limits
            if (((x + objapp.inc.x) > (window.innerWidth - 40)) || ((x + objapp.inc.x) <= 0))
                objapp.inc.x = (-1) * objapp.inc.x;
    
            //Detect if we reach Y coordinates limits
            if (((y + objapp.inc.y) > (window.innerHeight - 40)) || ((y + objapp.inc.y) <= 0))
                objapp.inc.y = (-1) * objapp.inc.y;
        }
    },
    control: function(status) {
        if (status == "start") {
            this.app = setInterval(this.appfunc(document.getElementById("ball")), 50);
        } else if (status == "stop") {
            clearInterval(this.app);
            this.app = false;
        }
    }
}

docReady(objapp.control("start"));
export default objapp;