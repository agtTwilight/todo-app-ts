import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import env from './util/validateEnv';
const app = express();

app.get('/', (req, res) => {
	res.send('Hello from TS, with ts-node!');
});

const port = env.PORT;

mongoose
	.connect(env.MONGODB_CONNECTION_STRING)
	.then(() => {
		console.log('Mongoose connected');
		app.listen(port!, () => {
			console.log(`listining on port: ${port}`);
		});
	})
	.catch(console.error);
