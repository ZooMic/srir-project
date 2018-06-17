const parseArgs = require('./args-parser');
const { readFile, sendFile } = require('./client.service');

/**
 * 
 * Read file, send file, get results
 * 
 */

let args = parseArgs();
if (!args) process.exit(1);

const file = readFile(args.filePath);

console.log("Sending file...");
sendFile('http://localhost:8000/task', file, args.data)
	.then(body => {
        console.log("Response body: ");
        console.log(body);
	}, error => {
        console.log('Error: ', error);
	});