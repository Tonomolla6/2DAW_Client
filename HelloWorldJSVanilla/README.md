Exercise.

2 points -> js/main.js with two global variables myState i myApp. Figure out a way to avoid globality. (Hint. Closures could help you)

I have created an object and I have put the global variable and the functions to be able to export it and use it all in the js files

2 points -> danceWorld() is a child function inside inicia() but its callable in a global scope. We can avoid this?

Correct, using "use strict" javascript forces us to declare the dw variable inside start, thanks to that it can only be started from the parent function

3 points -> Deal with module dependencies. main.js use core.js and stopball.js depend on main.js. In ES6 we can use import/export sentences to deal with module dependency at a browser level. Is it work in your browser?

It works in the browser if I use a web server and declare the type "modules" in the html script tag.

3 points -> Using same import/export mechanism as stated in previous point if we use webpack how it simplifies our deployment?

Create a minified file with all the javascript files together, which eliminates the import and export since it is all in the same file