const router = require("express").Router();
const Workout = require("../models/workoutModel");

//get all workouts
router.get("/", (req, res) => {
	res.json({ mess: "GET all workouts" });
});

//get one workout
router.get("/:id", (req, res) => {
	res.json({ mess: "GET a single workout" });
});

//post workout
router.post("/", async (req, res) => {
	const { title, reps, load } = req.body;

	try {
		const workout = await Workout.create({ title, load, reps });
		res.status(200).json(workout);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

//delete
router.delete("/:id", (req, res) => {
	res.json({ mess: "delete a workout" });
});

//update a workout
router.patch("/:id", (req, res) => {
	res.json({ mess: "update a workout" });
});

module.exports = router;
