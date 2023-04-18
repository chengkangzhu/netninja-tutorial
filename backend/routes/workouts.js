const router = require("express").Router();
const Workout = require("../models/workoutModel");
const requireAuth = require("../middlewares/requireAuth")
const {
	createWorkout,
	getWorkouts,
	getWorkout,
	deleteWorkout,
	updateWorkout,
} = require("../controllers/workoutController");


//require auth for all workouts
router.use(requireAuth)

//get all workouts
router.get("/", getWorkouts);

//get one workout
router.get("/:id", getWorkout);

//post workout
router.post("/", createWorkout);

//delete
router.delete("/:id", deleteWorkout);

//update a workout
router.patch("/:id", updateWorkout);

module.exports = router;
