/**
 * @file
 * Client instance performs following tasks: <br/>
 * - read file ({@link readFile}),<br/>
 * - send file ({@link sendFile}),<br/>
 * - get results
 */

const parseArgs = require('./args-parser');
const { readFile, sendFile } = require('./client.service');

let args = parseArgs();
if (!args) {
    console.log('Invalid arguments! \nUsage: \n node client.js [file_path] [data]');
    console.log('\nExample: \n node client.js input.js fibonacciNumber 16');
    process.exit(1);
}

const file = readFile(args.filePath);

console.log("Sending file...");
sendFile('http://localhost:8000/task', file, args.data)
	.then(body => {
        console.log("Response body: ");       
        const { result, comparison } = body;
        console.log(result); console.log();
        displayDiff(comparison);
	}, error => {
        console.log('Error: ', error);
    });
    
const displayDiff = ({added, removed, diff, msg}) => {

    if(msg){        
        console.log(`\x1b[33m ${msg} \x1b[0m`);
        return;
    }

    console.log(`\x1b[32m+Added ${added} signs\x1b[0m`);
    console.log(`\x1b[31m-Removed ${removed} signs\x1b[0m`);
    let str = 0;
    diff.forEach(({value, added, removed}) => {
        if (added) {
            str += '\x1b[32m' + value + '\x1b[0m';
        } else if (removed) {
            str += '\x1b[31m' + value +'\x1b[0m';
        } else {
            str += '\x1b[34m' + value +'\x1b[0m';
        }
    });

    console.log(str);
}