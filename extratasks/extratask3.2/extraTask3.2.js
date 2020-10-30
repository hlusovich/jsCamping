"use strict";
function findMaxProfit(prices) {
    let profit = 0;
    if (Array.isArray(prices) && prices.every(item => typeof item === "number")) {
        for (let i = 0; i < prices.length - 1; i++) {
            if (prices[i] < prices[i + 1]) {
                profit += prices[i + 1] - prices[i];
            }
        }
    }
    return profit;
}
