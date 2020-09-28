const bombo = {
    balls: [],
    balls_out: [],
    bombo_create: function () {
        this.balls = Array.from({length: 99}, (_,i) => i + 1);
        this.shuffle();
    },
    shuffle: function () {
        this.balls.sort((a,b) => Math.random() - 0.5);
    },
    catch_ball: function() {
        let pos = Math.floor(Math.random() * this.balls.length);
        this.balls_out.push(this.balls.splice(pos, 1)[0]);
    }
}

document.getElementById('start').addEventListener('click', function() {
    bombo.bombo_create();
    console.log(bombo.balls);
}, false);

document.getElementById('get').addEventListener('click', function() {
    bombo.catch_ball();
    console.log(bombo.balls);
    console.log(bombo.balls_out);
}, false);