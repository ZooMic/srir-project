const express = require('express');
const app = express();
const port = 8000
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/task', (req, res) => {
	
	const { body } = req;
	
	const result = !!body && performTask(body);

	res.status(200).json({result});
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})


const performTask = ({task, data}) => {
	let result;
	eval(task);
	return result;
};
