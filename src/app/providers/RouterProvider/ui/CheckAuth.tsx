import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { AppRoute } from "@/shared/configs/appRouteConfigs.ts";

export const CheckAuth: FC<PropsWithChildren> = (props) => {
	const { children } = props;
	const isAuth = false;

	if (isAuth) {
		return <Navigate to={AppRoute.sign_in} replace />;
	}

	return children;
};
