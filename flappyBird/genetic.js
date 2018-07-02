

function nextGeneration() {
    GENERATION_NUM ++;

    calculateFitness();
    pickBest(0.02);
    normalizeFitnessBest();
    birds[0] = new Bird(bestBirds[0].brain, false);
    for (let i = 1; i < TOTAL; i++) {
        birds[i] = pickOne();
    }
    savedBirds.splice(0, savedBirds.length)
}

function pickOne() {
    var index = 0;
    var r = random(1);

    while (r > 0) {
        r = r - bestBirds[index].fitness;
        index+=1;
    }
    index--;

    let bird  = bestBirds[index];
    let child = new Bird(bird.brain);
    // child.mutate();
    return child;
}

function pickBest(percentage) {
    savedBirds.sort(compareByFitness);
    let bestBirdsNumber = percentage*TOTAL;

    for (let i = 0; i < bestBirdsNumber; i++) {
        bestBirds[i] = savedBirds[i];
    }
}
function normalizeFitnessBest() {

    let sum = 0;
    for (let bird of bestBirds) {
        sum += bird.score;
    }
    for (let bird of bestBirds) {
        // divide by sum to normalize;
        bird.fitness = bird.score / sum;
    }
}

function calculateFitness() {

    let sum = 0;
    for (let bird of savedBirds) {
        sum += bird.score;
        if (BESTSCORE < bird.score) {
            BESTSCORE = bird.score
        }
    }
    for (let bird of savedBirds) {
        // divide by sum to normalize;
        bird.fitness = bird.score / sum;
    }
}
function compareByFitness(a,b) {
  if (a.score < b.fitness)
    return -1;
  if (a.score > b.fitness)
    return 1;
  return 0;
}
