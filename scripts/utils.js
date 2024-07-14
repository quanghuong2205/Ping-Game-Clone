'use strict';
export const randomRange = ({ min, max }) =>
    Math.random() * (max - min) + min;
