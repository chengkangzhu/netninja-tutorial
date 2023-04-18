require("dotenv").config();

const express = require("express");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");

//expressa pp
const app = express();

//middleware
app.use(express.json());

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//mongose
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log("connect to database and server runnning on port 4000");
		});
	})
	.catch((err) => console.log(err)); 
