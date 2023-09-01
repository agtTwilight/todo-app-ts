import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import NoteModel from '../models/note';

export const getNotes: RequestHandler = async (req, res, next) => {
	try {
		const notes = await NoteModel.find({ completed: false }).exec();

		res.status(200).json(notes);
	} catch (error) {
		next(error);
	}
};

export const getNote: RequestHandler = async (req, res, next) => {
	const noteId = req.params.noteId;

	try {
		if (!mongoose.isValidObjectId(noteId)) {
			throw createHttpError(400, `Invalid note id, ${noteId}`);
		}

		const note = await NoteModel.findById(noteId).exec();

		if (!note) {
			throw createHttpError(404, `Note ${noteId} not found.`);
		}
		res.status(200).json(note);
	} catch (error) {
		next(error);
	}
};

// type safety for created note req.body:
interface CreateNoteBody {
	title?: string;
	text?: string;
	priority?: number;
}

export const createNote: RequestHandler<
	unknown,
	unknown,
	CreateNoteBody,
	unknown
> = async (req, res, next) => {
	const title = req.body.title;
	const text = req.body.text;

	try {
		if (!title) {
			throw createHttpError(400, 'Notes must have a title');
		}

		const newNote = await NoteModel.create({
			title,
			text,
		});

		res.status(201).json(newNote);
	} catch (error) {
		next(error);
	}
};
