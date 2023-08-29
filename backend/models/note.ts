import { InferSchemaType, model, Schema } from 'mongoose';

const noteSchema = new Schema(
	{
		title: { type: String, required: true },
		text: { type: String },
		completed: { type: Boolean, default: false },
		priority: { type: Number, min: 1, max: 3, default: 1 },
	},
	{ timestamps: true }
);

// Create a note type so we can gain the benefits of using TypeScript.
type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>('Note', noteSchema);
