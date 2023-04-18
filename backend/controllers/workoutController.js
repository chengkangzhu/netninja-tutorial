const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workout
const getWorkouts = async (req, res) => {
	const user_id = req.user._id
	const workout = await Workout.find({user_id}).sort({ createdAt: -1 });

	res.status(200).json(workout);
};

//get a single workout
const getWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "no such workout" });
	}

	const workout = await Workout.findById(id);

	if (!workout) {
		return res.status(404).json({ error: "no such workout" });
	}
	res.status(200).json(workout);
};

//post a workout

const createWorkout = async (req, res) => {
	const { title, reps, load } = req.body;

	let emptyField = [];

	if (!title) {
		emptyField.push("title");
	}
	if (!reps) {
		emptyField.push("reps");
	}
	if (!load) {
		emptyField.push("load");
	}
	if (emptyField.length > 0) {
		return res
			.status(400)
			.json({ error: "Please fill in all field", emptyField });
	}

	// add doc to db
	try {
		const user_id = req.user._id;
		const workout = await Workout.create({ title, load, reps, user_id });
		res.status(200).json(workout);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//delete a workout
const deleteWorkout = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "no such workout" });
	}

	const workout = await Workout.findByIdAndDelete(id);

	if (!workout) {
		return res.status(404).json({ error: "no such workout" });
	}
	res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {
	const { id } = req.params;
	const { title, reps, load } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "no such workout" });
	}

	const workout = await Workout.findByIdAndUpdate(id, { ...req.body });

	if (!workout) {
		return res.status(404).json({ error: "no such workout" });
	}
	res.status(200).json(workout);
};

module.exports = {
	createWorkout,
	getWorkouts,
	getWorkout,
	deleteWorkout,
	updateWorkout,
};
