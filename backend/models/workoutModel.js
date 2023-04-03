const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		reps: {
			required: true,
			type: Number,
		},
		load: {
			required: true,
			type: Number,
		},
	},
	{ timestamps: true }
);


module.exports = mongoose.model("Workout",WorkoutSchema)

