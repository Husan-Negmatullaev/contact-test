import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { AppRoute } from "@/shared/configs/routeConfig/appRouteConfigs.ts";
import { useSelector } from "react-redux";
import { userSelector } from "@/entities/User";

export const CheckAuth: FC<PropsWithChildren> = (props) => {
	const { children } = props;
	const user = useSelector(userSelector);

	if (!user) {
		return <Navigate to={AppRoute.forbidden} replace />;
	}

	return children;
};
