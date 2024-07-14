'use strict';
const DEFAULT_VELOCITY = 0.05;
const DEFAULT_VELOCITY_INCRE = 0.0000001;

class Paddle {
    #y = 45;

    constructor(paddleNode, velocity) {
        this.paddleNode = paddleNode;
        this.velocity = velocity || DEFAULT_VELOCITY;
    }

    getRect() {
        return this.paddleNode.getBoundingClientRect();
    }

    updateYCoordUI() {
        this.paddleNode.style.setProperty('--top', this.#y);
    }

    incVelocity(value) {
        this.velocity += value || DEFAULT_VELOCITY_INCRE;
    }

    reset() {
        this.#y = 50;
    }

    autoMove(y) {
        this.#y = y;
        this.updateYCoordUI();
    }

    move(y) {
        console.log('run');
        this.#y = (y / window.innerHeight) * 100;
        this.updateYCoordUI();
    }
}

export default Paddle;
