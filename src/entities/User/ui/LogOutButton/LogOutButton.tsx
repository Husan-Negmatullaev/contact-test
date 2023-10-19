import { Button } from "@/shared/ui/Button/Button.tsx";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch.ts";
import { userActions } from "@/entities/User";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "@/shared/configs/routeConfig/appRouteConfigs.ts";
import { AUTHORIZATION_ID_STORAGE_KEY } from "@/entities/User/const/authorization.ts";

export const LogOutButton = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleClickLogOut = () => {
		dispatch(userActions.resetUser());
		localStorage.removeItem(AUTHORIZATION_ID_STORAGE_KEY);
		navigate(AppRoute.home, {
			replace: true,
		});
	};

	return (
		<Button variant={"danger"} onClick={handleClickLogOut}>
			Выход
		</Button>
	);
};
