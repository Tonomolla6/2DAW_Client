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
    },
    card_create: function () {
        // Sacamos 5 numeros del 1 al 9 aleatorios sin repetirse, las dos primeras lineas.
        let lines = Array.from({length: 2}, (_,x) => {
            let numbers = Array.from({length: 9}, (_,i) => i);
            Array.from({length: 4}, (_,e) => numbers.splice(Math.floor(Math.random() * numbers.length), 1));
            return numbers;
        });

        // Copiamos los arrays para poder trabjar con ellos sin perder informacion.
        var card_pos = Array(3);
        card_pos[0]=[...lines[0]];
        card_pos[1]=[...lines[1]];

        // Guardamos las repetidas y las borramos de lineas.
        let num_rep = Array.from({length: card_pos[0].length}, (_,x) => {
            if (card_pos[1].indexOf(card_pos[0][x]) >= 0) {
                lines[1].splice(lines[1].indexOf(card_pos[0][x]), 1);
                lines[0].splice(lines[0].indexOf(card_pos[0][x]), 1);
                return card_pos[0][x];
            }
        }).filter(function (el) {return el != null;});

        // Sacamos las lineas contrarias a las repetidas del 1 al 9.
        let num_exc = Array.from({length: 9}, (_,i) => {
            if (num_rep.indexOf(i) < 0) {
                return i;
            }
        }).filter(function (el) {return el != null;});
        
        // Juntamos las dos lineas y se las restamos a las excluidas, obtenemos las posiciones que no han salido en ninguna linea.
        var lines_con = lines[0].concat(lines[1]);
        var miss_nums = num_exc.filter(el => !lines_con.includes(el));

        // Apartir de los numeros de posiciones que han estado en alguna linea anterior elegimos aleatoriamente algunas de ellas hasta que la linea 3 tenga 5 posiciones para pintar.
        lines[2] = Array.from({length: (5 - miss_nums.length)}, (_,i) => {
            return lines_con.splice(Math.floor(Math.random() * lines_con.length), 1)[0];
        });
        
        card_pos[2]=[...lines[2].concat(miss_nums)].sort();

        // Sacamos los numeros del carton ordenados.
        var min;
        let bingo_card = [];
        Array.from({length: 9}, (_,i) => {
            (i == 0) ? min = 1:min = i * 9;
            let range = Array.from({length: 9}, (_,e) => min+e);
            Array.from({length: 6}, (_,e) => range.splice(Math.floor(Math.random() * range.length), 1)[0]);            
            console.log(range);
            let count = 0;
            card_pos.map(function(line) {
                i == 0 ? bingo_card[count] = []: null;
                    line.indexOf(i) >= 0 ? bingo_card[count].push(range[count]) : bingo_card[count].push("");
                count++;
            });
        });

        console.log(bingo_card);
        this.draw(bingo_card, "card");
    },
    draw: function(data, type) {
        if (type == "card") {
            let table = document.getElementById("table");
            // Reset table.
            document.getElementById("table").innerHTML = "";
            const reverse = data.reverse();
            reverse.forEach(element => {
                var row = table.insertRow(0);
                element = element.reverse();
                for (let p = 0; p < 9; p++) {
                    if (element[p]) {
                        let row_cell = row.insertCell(0);
                        row_cell.innerHTML = element[p];
                        row_cell.style.fontSize = "23px";
                    } else {
                        let row_cell = row.insertCell(0);
                        row_cell.innerHTML = "";
                        row_cell.style.background = "black";
                    }
                }
            });
        }
    }
}

document.getElementById('start').addEventListener('click', function() {
    bombo.bombo_create();
}, false);

document.getElementById('get').addEventListener('click', function() {
    bombo.catch_ball();
}, false);

document.getElementById('card').addEventListener('click', function() {
    bombo.card_create();
}, false);