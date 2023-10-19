import { RouterProvider } from "@/app/providers/RouterProvider";
import "./styles/styles.css";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch.ts";
import { useEffect } from "react";
import { fetchUserById, userMountedSelector } from "@/entities/User";
import { useSelector } from "react-redux";

const App = () => {
	const dispatch = useAppDispatch();
	const _mounted = useSelector(userMountedSelector);

	useEffect(() => {
		dispatch(fetchUserById());
	}, [dispatch]);

	return _mounted && <RouterProvider />;
};

export default App;
