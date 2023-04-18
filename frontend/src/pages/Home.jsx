import React, { useEffect } from "react";
import useWorkoutsContext from "../hooks/useWorkoutsContext";

//compononet
import WorkoutsDetail from "../components/WorkoutsDetail";
import WorkoutForm from "../components/WorkoutForm";

//contexty
import useAuthContext from "../hooks/useAuthContext";

const Home = () => {
	const { workouts, dispatch } = useWorkoutsContext();
	const { user } = useAuthContext();

	useEffect(() => {
		const fetchWorkouts = async () => {
			const response = await fetch("/api/workouts",{
				headers:{
					"Authorization":`Bearer ${user.token}`
				}
			});

			const json = await response.json();

			if (response.ok) {
				dispatch({ type: "SET_WORKOUTS", payload: json });
			}
		};

		if (user) {
			fetchWorkouts();
		}
	}, [dispatch,user]);
	return (
		<div className="home">
			<div className="workouts">
				{workouts &&
					workouts.map((workout) => (
						<WorkoutsDetail key={workout._id} workout={workout} />
					))}
			</div>
			<WorkoutForm />
		</div>
	);
};

export default Home;
