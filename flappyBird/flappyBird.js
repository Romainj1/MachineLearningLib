let birds = [];
let savedBirds = [];
var pipes = [];
let counter = 0;
let slider;
let espacement = 200

const TOTAL = 500;

function setup() {
    var canvas = createCanvas(800, 600);
    slider = createSlider(1, 100, 1)
    for (let i = 0; i < TOTAL; i++) {
        birds[i] = new Bird();
    }
}

function draw() {

    for (let n = 0; n < slider.value(); n++){
        if (counter % 75 == 0) {
            pipes.push(new Pipe(espacement));
        }
        counter ++;
        if (espacement > 75) {
            espacement-=0.01;
        }
        for (var i = pipes.length-1 ; i >= 0; i--) {
            pipes[i].update();
            if (pipes[i].offscreen()) {
                pipes.splice(i, 1);
            }

            for (let j = birds.length - 1; j >= 0; j--) {
                if (pipes[i].hits(birds[j]) || birds[j].bottomTop()) {
                    savedBirds.push(birds.splice(j, 1)[0]);

                }
            }

        }

        for (let bird of birds)  {
            bird.think(pipes);
            bird.update();
        }

        if (birds.length === 0) {
            nextGeneration();
            espacement = 200;
            counter = 0;
            pipes = [];
        }
    }

    // All the drawing
    background(0);

    for (let bird of birds)  {
        bird.show();
    }

    for (let pipe of pipes) {
        pipe.show();
    }
}
