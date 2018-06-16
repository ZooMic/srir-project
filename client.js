const request = require('request');
const fs = require('fs');

/**
 * 
 * Read file, send file, get results
 * 
 */

if (process.argv.length < 3) {
    console.log('Invalid arguments! \nUsage: \n node client.js [file_path] [data]');
    console.log('\nExample: \n node client.js input.js fibonacciNumber 16');
    process.exit(1);
}

let filePath = process.argv[2];
let data = {};

if (process.argv.length > 3) {
	for (let i = 3; i < process.argv.length; i += 2) {
        let key = process.argv[i];
		if (i + 1 > process.argv.length - 1) {
			console.error("Missing value for key '" + key + "'");
			process.exit(1);
        }

		data[key] = process.argv[i + 1];
	}
}

fs.readFile(filePath, 'utf8', (error, file) => {
	if( error ) {
		console.log("Error: ", error);
	} else {
		console.log("Sending file...");
		sendFile('http://localhost:8000/task', file);
	}
});

const sendFile = (url, file) =>
	request.post({
		url,
		body: { task: file, data },
		json: true,
	}, handleResponse);


const handleResponse = (error, resp, body) => {
	if(error) {
		console.log('Error: ', error);
	} else {
		console.log("Response body: ");
		console.log(body);	
	}
};