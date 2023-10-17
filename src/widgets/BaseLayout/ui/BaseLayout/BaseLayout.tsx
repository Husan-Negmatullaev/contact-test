import { FC } from "react";
import { clsx } from "clsx";
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header.tsx";

export const BaseLayout: FC = () => {
	return (
		<div className={clsx("wrapper")}>
			<Header />
			<main>
				<Outlet />
			</main>
		</div>
	);
};
