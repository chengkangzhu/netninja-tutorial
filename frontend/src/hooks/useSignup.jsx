import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const {  dispatch } = useAuthContext();
	const navigate = useNavigate();

	const signup = async (email, password) => {
		try {
			setIsLoading(true);
			setError(null);

			const response = await fetch("/api/user/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const json = await response.json();

			if (!response.ok) {
				throw new Error(json.error);
			}

			//save user to local storage
			localStorage.setItem("user", JSON.stringify(json));
			dispatch({ type: "LOGIN", payload: json });
			setIsLoading(false);
			navigate("/");
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	};

	return { signup, error, isLoading };
};

export default useSignup;
