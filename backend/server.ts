import mongoose from 'mongoose';
import app from './app';
import env from './util/validateEnv';

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
