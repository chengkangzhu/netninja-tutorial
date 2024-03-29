import React, { useState } from "react";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
import useAuthContext from "../hooks/useAuthContext";

const WorkoutForm = () => {
	const { dispatch } = useWorkoutsContext();
	const [title, setTitle] = useState("");
	const [load, setLoad] = useState("");
	const [reps, setReps] = useState("");
	const [error, setError] = useState(null);
	const [emptyField, setEmptyField] = useState([]);
	const {user} = useAuthContext();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if(!user){
			setError("You must be logged in ")
			return 
		}

		const workout = { title, load, reps };

		const response = await fetch("/api/workouts", {
			method: "POST",
			body: JSON.stringify(workout),
			headers: {
				"Content-Type": "application/json",
				"Authorization":`Bearer ${user.token}`
			},
		});

		const json = await response.json();

		if (!response.ok) {
			setError(json.error);
			setEmptyField(json.emptyField)
		}
		if (response.ok) {
			setTitle("");
			setLoad("");
			setReps("");
			setError(null);
			setEmptyField([])
            console.log('new workout added', json)
			dispatch({ type: "CREATE_WORKOUT", payload: json });
		}
	};
	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>add a new Workout</h3>
			<label>Exericse List :</label>
			<input
				type="text"
				onChange={(e) => setTitle(e.target.value)}
				value={title}
				className={emptyField.includes("title") ? "error" : ""}
			/>
			<label>Load (in kg) :</label>
			<input
				type="number"
				onChange={(e) => setLoad(e.target.value)}
				value={load}
				className={emptyField.includes("load") ? "error" : ""}
			/>
			<label>Reps :</label>
			<input
				type="number"
				onChange={(e) => setReps(e.target.value)}
				value={reps}
				className={emptyField.includes("reps") ? "error" : ""}
			/>
			<button>Add Workout</button>
			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default WorkoutForm;
