import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw Error(
			"use authcontext must be used inside of a context authcontextprovider"
		);
	}

	return context;
};

export default useAuthContext;
