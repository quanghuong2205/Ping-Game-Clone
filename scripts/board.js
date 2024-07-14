'use strict';
import Ball from './ball.js';
import Paddle from './paddle.js';

class Board {
    lastRepaintTime = null;

    constructor({
        ballSelector,
        paddleSelector,
        leftScoreSelector,
        rightScoreSelector,
    }) {
        this.ballNode = new Ball(document.querySelector(ballSelector));
        this.paddleNode = new Paddle(
            document.querySelector(paddleSelector)
        );
        this.leftScoreNode = document.querySelector(leftScoreSelector);
        this.rightScoreNode = document.querySelector(rightScoreSelector);

        // window.addEventListener('mousemove', (e) => {
        //     this.paddleNode.move.call(this.paddleNode, e.y);
        // });
    }

    incLeftScoreUI(value) {
        this.leftScoreNode.textContent =
            +this.leftScoreNode.textContent + value;
    }

    incRightScoreUI(value) {
        this.rightScoreNode.textContent =
            +this.rightScoreNode.textContent + value;
    }

    repaintFrame(timeStemp) {
        /* Store last repaint time */
        if (!this.lastRepaintTime) {
            this.lastRepaintTime = timeStemp;
            requestAnimationFrame(this.repaintFrame.bind(this));
            return;
        }

        /* Calculate time gap between each repain request */
        const delta = timeStemp - this.lastRepaintTime;

        /* Repaint ball and paddles... */
        this.ballNode.moveBall(delta);
        // this.paddleNode.autoMove(this.ballNode.getYCoord());

        /* Check collision */
        const { left, right, top, bottom } = this.paddleNode.getRect();
        this.ballNode.onCollision({
            paddleLeft: left,
            paddleRight: right,
            paddleTop: top,
            paddleBottom: bottom,
        });

        /* Check if round is end */
        this.handleIfRoundEnded();

        /* Update last repaint time */
        this.lastRepaintTime = timeStemp;

        /* Bind `this` for `repaintFrame` to refers to the current `Board` object */
        requestAnimationFrame(this.repaintFrame.bind(this));
    }

    /* The round is ended */
    handleIfRoundEnded() {
        const { isOut, outToLeft, outToRight } =
            this.ballNode.isOutOfHorizontalBoard();

        /* Not out */
        if (!isOut) return;

        /* Out to left */
        if (outToLeft) {
            this.incRightScoreUI(1);
        }

        /* Out to right */
        if (outToRight) {
            this.incLeftScoreUI(1);
        }

        /* Reset round */
        this.resetRound();
    }

    /* Reset score */
    resetScore() {
        this.rightScoreNode.textContent = 0;
        this.leftScoreNode.textContent = 0;
    }

    /* Reset round */
    resetRound() {
        this.ballNode.reset();
        this.paddleNode.reset();
    }

    /* Reset game */
    resetGame() {
        this.ballNode.reset();
        this.paddleNode.reset();
        this.resetScore();
    }
}

const board = new Board({
    ballSelector: '#ball',
    paddleSelector: '.paddle-right',
    leftScoreSelector: '.score-left',
    rightScoreSelector: '.score-right',
});

// board.repaintFrame();
