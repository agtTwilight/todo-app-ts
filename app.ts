import 'dotenv/config';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.send('Hello from TS, with ts-node!');
});

export default app;
