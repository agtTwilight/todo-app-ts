import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../models/note";

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

		if (!note) throw createHttpError(404, `Note ${noteId} not found.`);

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
	const priority = req.body.priority;

	try {
		if (!title) throw createHttpError(400, "Notes must have a title");

		const newNote = await NoteModel.create({
			title,
			text,
			priority,
		});

		res.status(201).json(newNote);
	} catch (error) {
		next(error);
	}
};

interface UpdateNoteParams {
	noteId: string;
}

interface UpdateNoteBody {
	title?: string;
	text?: string;
	completed?: boolean;
	priority?: number;
}

export const updateNote: RequestHandler<
	UpdateNoteParams,
	unknown,
	UpdateNoteBody,
	unknown
> = async (req, res, next) => {
	const noteId = req.params.noteId;
	const newTitle = req.body.title;
	const newText = req.body.text;
	const newCompleted = req.body.completed;
	const newPriority = req.body.priority;

	try {
		if (!mongoose.isValidObjectId(noteId)) {
			throw createHttpError(400, `Invalid note id, ${noteId}`);
		}

		const note = await NoteModel.findById(noteId).exec();

		if (!note) throw createHttpError(404, `Note ${noteId} not found.`);

		if (newTitle) note.title = newTitle;
		if (newText) note.text = newText;
		if (newCompleted) note.completed = newCompleted;
		if (newPriority) note.priority = newPriority;

		const updatedNote = await note.save();

		res.status(200).json(updatedNote);
	} catch (error) {
		next(error);
	}
};

export const deleteNote: RequestHandler = async (req, res, next) => {
	const noteId = req.params.noteId;

	try {
		if (!mongoose.isValidObjectId(noteId)) {
			throw createHttpError(400, `Invalid note id, ${noteId}`);
		}

		await NoteModel.findOneAndDelete({ _id: noteId });

		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};
