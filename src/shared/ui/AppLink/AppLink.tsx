import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { clsx } from "clsx";
import classes from "./AppLink.module.css";
import { ClassNameType } from "@/shared/types/types.ts";
import { AppRoute } from "@/shared/configs/routeConfig/appRouteConfigs.ts";

type AppLinkProps = ClassNameType<{
	to: AppRoute;
}>;

export const AppLink: FC<PropsWithChildren<AppLinkProps>> = (props) => {
	const { to, className, children } = props;

	return (
		<Link to={to} className={clsx(classes.link, className)}>
			{children}
		</Link>
	);
};
