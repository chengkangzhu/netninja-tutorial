import useAuthContext from "./useAuthContext";
import useWorkoutsContext from "./useWorkoutsContext";

export const useLogout = () => {
	//return a function that remove the user from the localstorage, send dispatch to contet to logout

	const { dispatch: authDispatch } = useAuthContext();
	const { dispatch: workoutDispatch } = useWorkoutsContext();
	const logout = () => {
		localStorage.removeItem("user");
		authDispatch({ type: "LOGOUT" });
		workoutDispatch({ type: "SET_WORKOUTS", payload: null });
	};

	return { logout };
};
