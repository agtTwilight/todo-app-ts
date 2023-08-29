import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import NoteModel from './models/note';

const app = express();

app.get('/', async (req, res, next) => {
	try {
		const notes = await NoteModel.find({ completed: false }).exec();

		res.status(200).json(notes);
	} catch (error) {
		// What next is doing...
		// next(error) tells the code that, in the event of an error in this function, run the next function with the value of error from this function. That is how we setup an error handling function (though this might not work if you have multiple routes in one file)
		next(error);
	}
});

app.use((req, res, next) => {
	next(Error('Endpoint not found'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
	console.error(error);
	let errorMessage = 'An unknown error occured';
	if (error instanceof Error) errorMessage = error.message;
	res.status(500).json({ error: errorMessage });
});

export default app;
