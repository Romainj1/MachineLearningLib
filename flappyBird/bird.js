// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// This flappy bird implementation is adapted from:
// https://youtu.be/cXgA1d_E-jY&

// Mutation function to be passed into bird.brain
function mutate(x) {
    if (random(1) < 0.05) {
        let offset = randomGaussian(0, 0.1);
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
}

class Bird {
    constructor(brain) {
        // position and size of bird
        this.y = height / 2;
        this.x = 64;
        this.r = 12;

        // Gravity, lift and velocity
        this.gravity = 0.7;
        this.lift = -16;
        this.velocity = 0;

        // Is this a copy of another Bird or a new one?
        // The Neural Network is the bird's "brain"
        if (brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
            this.brain.mutate(mutate);
        } else {
            this.brain = new NeuralNetwork(5, 8, 2);
        }

        // Score is how many frames it's been alive
        this.score = 0;
        // Fitness is normalized version of score
        this.fitness = 0;
    }

    // Create a copy of this bird
    copy() {
        return new Bird(this.brain);
    }

    // Display the bird
    show() {
        fill(255, 100);
        stroke(255);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    // This is the key function now that decides
    // if it should jump or not jump!
    think(pipes) {
        // First find the closest pipe
        let closest = null;
        let record = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let diff = pipes[i].x + pipes[i].w- this.x;
            if (diff > 0 && diff < record) {
                record = diff;
                closest = pipes[i];
            }
        }

        if (closest != null) {
            // Now create the inputs to the neural network
            let inputs = [];
            // x position of closest pipe
            inputs[0] = this.y / height;
            // top of closest pipe opening
            inputs[1] = closest.top / height;
            // bottom of closest pipe opening
            inputs[2] = closest.bottom / height;
            // bird's y position
            inputs[3] = closest.x / width;
            // bird's y velocity
            inputs[4] = this.velocity / 10;

            // Get the outputs from the network
            let action = this.brain.predict(inputs);
            // Decide to jump or not!
            if (action[1] > action[0]) {
                this.up();
            }
        }
    }

    // Jump up
    up() {
        this.velocity += this.lift;
    }

    bottomTop() {
        // Bird dies when hits bottom?
        return (this.y > height || this.y < 0);
    }

    // Update bird's position based on velocity, gravity, etc.
    update() {
        this.velocity += this.gravity;
        // this.velocity *= 0.9;
        this.y += this.velocity;

        // Every frame it is alive increases the score
        this.score++;
    }
}
