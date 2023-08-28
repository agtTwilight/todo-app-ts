import express from 'express';
const port = '8000';

const app = express();

app.get('/', (req, res) => {
	res.send('Hello from TS, with ts-node!');
});

app.listen(port, () => {
	console.log(`listining on port: ${port}`);
});
