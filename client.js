const request = require('request');
const fs = require('fs');

/**
 * 
 * Read file, send file, get results
 * 
 */

 fs.readFile('./input.js', 'utf8', (error, file) => {
      if( error ) {
        console.log("Error: ", error)
      } else {
		console.log("Sending file...");
		sendFile('http://localhost:8000/task', file);
      }
 });

const sendFile = (url, file) => {

	request.post({
		url,
		body: { task: file, data: { fibonacciNumber: 3 } },
		json: true,
	}, handleResponse);

};


const handleResponse = (error, resp, body) => {
	if(error) {
		console.log('Error: ', error);
	} else {
		console.log("Response body: ");
		console.log(body);	
	}
};