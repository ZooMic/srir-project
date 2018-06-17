const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const incomingCodeValidator = require('./incoming-code-validator');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
		res.status(200)
			.json({result});
	} else {
		res.status(400)
			.json({result: message});
	}

	
});

const server = app.listen(port, (err) => {
	if (err) {
		return console.log('something bad happened', err)
  	}
  	console.log(`server is listening on ${port}`)
});

const performTask = ({task, data}) => {
	let result;	
	eval(task);
	return result;
};

module.exports = server;