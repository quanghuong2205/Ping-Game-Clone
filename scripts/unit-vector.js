'use strict';

import { randomRange } from './utils.js';

class UnitVector {
    static randomVector() {
        let x = 0;
        let y = 0;

        while (Math.abs(x) < 0.3 || Math.abs(x) > 0.8) {
            /* 360 deg */
            const radian = randomRange({
                min: 0,
                max: Math.PI * 2,
            });

            /* Calculate X, Y */
            x = Math.cos(radian);
            y = Math.sin(radian);
        }

        /* Return */
        return {
            x,
            y,
        };
    }
}

console.log(UnitVector.randomVector());

export default UnitVector;
