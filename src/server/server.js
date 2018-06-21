/**
 * @file
 * Server instance performs following tasks: <br/>
 * - define '/task' endpoint,<br/>
 * - execute supplied task code,<br/>
 * - await connections
 */

const express = require('express');
const bodyParser = require('body-parser');

const incomingCodeValidator = require('./incoming-code-validator');
const arch = require('./archive');
const archiveCode = arch.archiveCode;
const createDiff = arch.createDiff;

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * @function createTaskEndpoint
 * @description
 * Defines '/task' endpoint.
 * Endpoint receives task code and data object,
 * then validates ({@link incomingCodeValidator}) the code and executes ({@link performTask}) task.
 *
 * @see incomingCodeValidator
 * @see performTask
 *
 * @param {object} req - request object
 * @param {object} res - response object
 */
app.post('/task', (req, res) => {
	const { body } = req;

	if (!Object.keys(body).length) {
		res.status(400).send("Body is empty");
		return;
    }

	const { task } = body;

	const validation = incomingCodeValidator(task);
	const { success, message } = validation;

	if (success) {
		const result = !!body && performTask(body);
		archiveCode(task);
		const comparison = createDiff();

		res.status(200)
			.json({ result, comparison });
		
	} else {
		res.status(400)
			.json({result: message});
	}
});

/**
 * @const server
 * Creates a server on given port and awaits connections
 * @type {http.Server}
 */
const server = app.listen(port, (err) => {
	if (err) {
		return console.log('something bad happened', err)
  	}
  	console.log(`server is listening on ${port}`)
});

/**
 * Executes task code using JS eval function, then returns result
 * @param {string} task - task code to be executed
 * @param {object} data - optional supplied task data
 * @returns {*}
 */
const performTask = ({task, data}) => {
	let result;	
	eval(task);
	return result;
};

module.exports = server;