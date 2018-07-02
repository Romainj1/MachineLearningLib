/* Based on the work of The Coding Train : https://www.youtube.com/watch?v=c6y21FkaUqw
Author : Romain Jacquier - romain.jacquier@insa-rouen.fr
Date   : 2018
*/

let birds = [];
let bestBirds = [];
let savedBirds = [];
var pipes = [];
let counter = 0;
let sliderSpeed;
let sliderSpacing;
let sliderPopulation;
let bestScoreText;
let generationNumText;
let spacingValueText;
let speedOfGameText;
let PopulationText;

let resetBestScoreButton;
let BESTSCORE = 0;
let GENERATION_NUM = 1;

let TOTAL = 500;

function setup() {

    // Our working canvas
    var canvas = createCanvas(800, 600);
    canvas.parent('flappyBird');

    // Creating HTML Elements for live parametring
    sliderSpeed = createSlider(1, 100, 1);
    sliderSpeed.parent("sliderSpeed")

    sliderSpacing = createSlider(75, 200, 150);
    sliderSpacing.parent("sliderSpacing")

    sliderPopulation = createSlider(1, 1500, 500);
    sliderPopulation.parent("sliderPopulation")

    bestScoreText = createP();
    bestScoreText.parent("bestScoreText");

    generationNumText = createP();
    generationNumText.parent("generationNumText");
    generationNumText.elt.textContent = "Generation : " + GENERATION_NUM;

    spacingValueText = createP();
    spacingValueText.parent("spacingValueText");

    speedOfGameText = createP();
    speedOfGameText.parent("speedOfGameText");
    speedOfGameText.elt.textContent = "Speed of game : ";

    PopulationText = createP();
    PopulationText.parent("PopulationText");

    resetBestScoreButton = createButton("Reset");
    resetBestScoreButton.parent("resetBestScoreButton");
    resetBestScoreButton.mousePressed(function() {
        BESTSCORE = 0;
    });

    for (let i = 0; i < TOTAL; i++) {
        birds[i] = new Bird();
    }
}

function draw() {

    for (let n = 0; n < sliderSpeed.value(); n++){
        if (counter % 75 == 0) {
            pipes.push(new Pipe(sliderSpacing.value()));
        }
        counter ++;
        for (var i = pipes.length-1 ; i >= 0; i--) {
            pipes[i].update();
            if (pipes[i].offscreen()) {
                pipes.splice(i, 1);
            }

            for (let j = birds.length - 1; j >= 0; j--) {
            if (birds[0].score > BESTSCORE) {
                BESTSCORE = birds[0].score;
                bestScoreText.elt.textContent =  "Best score : " + BESTSCORE;
            }
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
            generationNumText.elt.textContent = "Generation : " + GENERATION_NUM;

            counter = 0;
            pipes = [];
        }
    }

    // All the drawing
    background(0);
    spacingValueText.elt.textContent = "Spacing : " + sliderSpacing.value();
    TOTAL = sliderPopulation.value();
    PopulationText.elt.textContent = "Population : " + TOTAL ;


    for (let bird of birds)  {
        bird.show();
    }

    for (let pipe of pipes) {
        pipe.show();
    }
}
