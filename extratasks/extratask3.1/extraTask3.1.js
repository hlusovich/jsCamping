"use strict";

function findMaxSubArr(array) {
    let accumulator = 0;
    let currentSub = 0;
    if (Array.isArray(array) && array.every(item => typeof item === "number")) {
        for (let i = 0; i < array.length; i++) {
            if ((currentSub + array[i]) > 0) {
                currentSub += array[i];
            } else {
                currentSub = 0;
            }
            if (currentSub > accumulator) {
                accumulator = currentSub;
            }
        }
    }
    return accumulator;
}
