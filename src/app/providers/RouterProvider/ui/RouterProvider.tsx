import { useCallback } from "react";
import { AppRouteType, routeConfig } from "../config/routerConfig.tsx";
import {
	createBrowserRouter,
	RouterProvider as BrowserRouter,
	RouteObject,
} from "react-router-dom";
import { CheckAuth } from "@/app/providers/RouterProvider/ui/CheckAuth.tsx";

export const RouterProvider = () => {
	const mapRouteByAuthedUser = useCallback((routers: AppRouteType[]) => {
		return routers.map(
			(route): RouteObject => ({
				path: route.path,
				element: route.private ? (
					<CheckAuth>{route.element}</CheckAuth>
				) : (
					route.element
				),
				children: route.children,
			}),
		);
	}, []);

	return (
		<BrowserRouter
			router={createBrowserRouter(mapRouteByAuthedUser(routeConfig))}
		/>
	);
};
