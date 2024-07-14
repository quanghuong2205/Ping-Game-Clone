import UnitVector from './unit-vector.js';

const DEFAULT_VELOCITY = 0.05;
const DEFAULT_VELOCITY_INCRE = 0.0000001;

class Ball {
    #coords = {
        x: 50,
        y: 50,
    };
    /* Ball will move by vector direction */
    #vector = {
        x: 0,
        y: 0,
    };

    constructor(ballNode, velocity) {
        this.ballNode = ballNode;
        this.#vector = UnitVector.randomVector();
        this.velocity = velocity || DEFAULT_VELOCITY;
    }

    getYCoord() {
        return this.#coords.y;
    }

    updateXCoordUI() {
        this.ballNode.style.setProperty('--x', this.#coords.x);
    }

    updateYCoordUI() {
        this.ballNode.style.setProperty('--y', this.#coords.y);
    }

    updateCoordUI() {
        this.updateXCoordUI();
        this.updateYCoordUI();
    }

    /* Check if the ball moved out of board (vertical) */
    isOutOfVerticalBoard() {
        const { top, bottom } = this.ballNode.getBoundingClientRect();

        return {
            isOut: top <= 0 || bottom >= window.innerHeight,
            outToTop: top <= 0,
            outToBottom: bottom >= window.innerHeight,
        };
    }

    /* Check if the ball moved out of board (horizontal) */
    isOutOfHorizontalBoard() {
        const { right, left } = this.ballNode.getBoundingClientRect();

        return {
            isOut: left <= 0 || right >= window.innerWidth,
            outToLeft: left <= 0,
            outToRight: right >= window.innerWidth,
        };
    }

    reset() {
        this.#coords = {
            x: 50,
            y: 50,
        };

        this.#vector = UnitVector.randomVector();
    }

    setCoords(x, y) {
        this.#coords = { x, y };
    }

    incVelocity(value) {
        this.velocity += value || DEFAULT_VELOCITY_INCRE;
    }

    reverseY() {
        this.#vector.y *= -1;
    }

    reverseX() {
        this.#vector.x *= -1;
    }

    /* Collision with paddle */
    onCollision({ paddleLeft, paddleRight, paddleBottom, paddleTop }) {
        const { right, left, top, bottom } =
            this.ballNode.getBoundingClientRect();
        if (
            paddleLeft <= right &&
            paddleRight >= left &&
            paddleTop <= bottom &&
            paddleBottom >= top
        ) {
            this.reverseX();
            this.updateXCoordUI();
        }
    }

    /* MoveBall */
    moveBall(delta) {
        const { x: xV, y: yV } = this.#vector;
        const { x: xC, y: yC } = this.#coords;

        /* Calculate new coords */
        const newX = xC + xV * delta * this.velocity;
        const newY = yC + yV * delta * this.velocity;

        /* Update ball coordinates */
        this.setCoords(newX, newY);
        this.updateCoordUI();

        /* Increase velocity */
        this.incVelocity();

        /* Check if new coord is out of board */
        const { isOut: isOutVertical } = this.isOutOfVerticalBoard();
        if (!isOutVertical) return;

        /* Reverse vector direction */
        this.reverseY();
        this.updateYCoordUI();
    }
}

export default Ball;
