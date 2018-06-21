/**
 * Idea is simple:
 *  - user can use its data by referring to data variable
 *  - user can return result by assigning value to the result variable
 */


const fibonacci = number => {
    let a = 1, b = 0, t;
    while(number > 0) {
        t = a;
        a = a + b;
        b = t;
        number--;
    }
    return b;
};

const { fibonacciNumber } = data;
const fibonacciResult = fibonacci(fibonacciNumber);

result = fibonacciResult;

