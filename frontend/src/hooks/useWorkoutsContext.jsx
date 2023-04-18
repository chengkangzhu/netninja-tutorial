import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutContext";

const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)

    if(!context){
        throw Error("use workoutcontext must be used inside of a context workoutcontextprovider")
    }

	return context;
};

export default useWorkoutsContext;
