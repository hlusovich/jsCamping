/**
 * add using params a and b.
 * @param {number} a the first operand of the addition operation.
 * @param {number} b the second operand of the addition operation.
 * if the function received both operands:
 * @returns {number} which is the result of addition of the first and the second parameters.
 *  if the function received only one parameter:
 *  @returns {function} which accepts a single parameter,
 *  which is  the second operand of the addition operation,
 *  and this function:
 *  @returns {number} , which is the result of addition of the parameter
 *  from the first function and  the parameter from the second function.
 */
function add(a, b) {
    return typeof a === 'number' && typeof b === 'number' ? a + b : add.bind(null, a);
}

/**
 * sub using params a and b.
 * @param {number} a the first operand of the subtractions operation.
 * @param {number} b the second operand of the subtractions operation.
 * if the function received both operands:
 * @returns {number} which is the result of subtractions of the first and the second parameters.
 *  if the function received only one parameter:
 *  @returns {function} which accepts a single parameter,
 *  which is  the first operand of the subtractions operation,
 *  and this function:
 *  @returns {number}, which is the result of subtraction of the parameter
 *  from the second function and  the parameter from the first function.
 */

function sub(a, b) {
    function revertSub(x, y) {
        return y - x;
    }

    return typeof a === 'number' && typeof b === 'number' ? a - b : revertSub.bind(null, a);
}

/**
 * mul using params a and b.
 * @param {number} a the first operand of the multiplication operation.
 * @param {number} b the second operand of the multiplication operation.
 * if the function received both operands:
 * @returns {number} which is the result of multiplication of the first and the second parameters.
 *  if the function received only one parameter:
 *  @returns {function} which accepts a single parameter,
 *  which is  the second operand of the multiplication operation,
 *  and this function:
 *  @returns {number} , which is the result of multiplication of the parameter
 *  from the first function and  the parameter from the second function.
 */

function mul(a, b) {
    return typeof a === 'number' && typeof b === 'number' ? a * b : mul.bind(null, a);
}

/**
 * div using params a and b.
 * @param {number} a the first operand of the division operation.
 * @param {number} b the second operand of the division operation.
 * if the function received both operands:
 * @returns {number} which is the result of division of the first and the second parameters.
 *  if the function received only one parameter:
 *  @returns {function} which accepts a single parameter,
 *  which is  the firs operand of the division operation,
 *  and this function:
 *  @returns {number} , which is the result of division of the parameter
 from the second function and  the parameter from the first function.
 */

function div(a, b) {
    function revertDiv(x, y) {
        return y / x;
    }

    return typeof a === 'number' && typeof b === 'number' ? a / b : revertDiv.bind(null, a);
}

/**
 * pipe using undefined сount of parameters.
 * @param {function} one of the functions add, sub, div,
 * mul which was called with single parameter.
 * @returns {function} which accepts a single parameter,
 * which is the argument for the first function passed to function pipe,
 * and which:
 *@returns {number} which the result of calling
 * functions passed to the pipe and then passing the
 *result of calling each
 *function as an argument to the next one.
 */
function pipe(...arr) {
    return function (initialValue) {
        return arr.reduce((acc, curr) => curr(acc), initialValue);
    };
}

console.log('Вызываем функцию add с двумя параметрами 7 и 9');
console.log(add(7, 9));
console.log('Вызываем функцию sub с двумя параметрами 16 и 9');
console.log(sub(16, 9));
console.log('Вызываем функцию mul с двумя параметрами 9 и 7');
console.log(mul(9, 7));
console.log('Вызываем функцию div с двумя параметрами 63 и 7');
console.log(div(63, 7));
console.log('**********************************************************');
console.log('Вызываем функцию add с одним параметром 7');
const addWithOneParam = add(7);
console.log('Вызываем результат вызова  add с одним параметром  с параметром 8');
console.log(addWithOneParam(8));
console.log('Вызываем функцию sub с одним параметром 7');
const subWithOneParam = sub(7);
console.log('Вызываем результат вызова  sub с одним параметром  с параметром 16');
console.log(subWithOneParam(16));
console.log('Вызываем функцию mul с одним параметром 7');
const mulWithOneParam = mul(7);
console.log('Вызываем результат вызова  mul с одним параметром  с параметром 9');
console.log(mulWithOneParam(9));
console.log('Вызываем функцию div с одним параметром 7');
const divWithOneParam = div(7);
console.log('Вызываем результат вызова  div с одним параметром  c параметром 49');
console.log(divWithOneParam(49));
console.log('**********************************************************');
console.log('проверка работы функции pipe');
console.log(pipe(pipe(add(1), mul(2)))(3));
console.log(pipe(add(58), sub(29), mul(30), div(3))(0));
