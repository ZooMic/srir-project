/**
 * Idea is simple:
 *  - user can use its data by referring to data variable
 *  - user can return result by assigning value to the result variable
 */


const fibonacci = number => {
    let a = 1, b = 0, t;
    for (let i = 0; i < number; i++) {
        t = a;
        a = a + b;
        b = t;
    }
    return b;
};

const { fibonacciNumber } = data;
const fibonacciResult = fibonacci(fibonacciNumber);

const ends = ['st', 'nd', 'rd', 'th'];
const end = fibonacciNumber > 3 ? ends[3] : ends[fibonacciNumber - 1];
console.log('##################################################');
console.log('                                        ');
console.log('    Starting Fibonacci calculations...  ');
console.log(`    ${fibonacciNumber}${end} item of Fibonacci sequence is ${fibonacciResult}`);
console.log('                                        ');
console.log('##################################################');

result = fibonacciResult;

