const game = {
        bombo: [],
        balls_out: [],
        start: function () {
            this.bombo_create();
        },
        bombo_create: function () {
            let bombo = Array(99);
            for (let i = 0; i < 99; i++) {
                bombo[i] = i;
            }
            this.bombo_mix(bombo);
        },
        bombo_mix: function (bombo) {
            let position = 0;
            let new_bombo = [];

            for (let g = 0; g < bombo.length; g++) {
                while (true) {
                    position = Math.floor(Math.random() * bombo.length);
                    if (bombo[position] != null) {
                        new_bombo[g] = bombo[position];
                        bombo[position] = null;
                        break;
                    }
                }
            }
            this.bombo = new_bombo;
        },
        catch_ball: function(num) {
            for (let y = 0; y < num; y++) {
                while (true) {
                    var selected = Math.floor(Math.random() * this.bombo.length)
                    if (Number.isInteger(this.bombo[selected])) {
                        this.balls_out[this.balls_out.length] = this.bombo[selected];
                        this.bombo.splice(selected, 1);
                        this.bombo_mix(this.bombo);
                        break;
                    }
                }
            }
        }
    }

document.getElementById('start').addEventListener('click', function() {
    game.start();
    console.log(game.bombo);
}, false);

document.getElementById('get').addEventListener('click', function() {
    game.catch_ball(1);
    console.log(game.bombo);
    console.log(game.balls_out);
}, false);