module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "node": true,

    },
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module",
        "no-underscore-dangle": ["error", { "allowAfterThis": true }]





},
    "rules": {
        "no-underscore-dangle": ["error", { "allowAfterThis": true }],
        "class-methods-use-this": ["error", { "exceptMethods": ["user","messages"] }],

    },
    "extends": "airbnb-base",






};
