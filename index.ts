import express from 'express';
const port = '3080';

const app = express();

app.get('/', (req, res) => {
	res.send('Hello from TS, with watchmode!');
});

app.listen(port, () => {
	console.log(`listining on port localhost:${port}`);
});
