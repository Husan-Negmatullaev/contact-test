import { useCallback } from "react";
import {
	AppRouteObject,
	AppRouteType,
	routeConfig,
} from "../config/routerConfig.tsx";
import {
	RouteObject,
	createBrowserRouter,
	RouterProvider as BrowserRouter,
} from "react-router-dom";
import { CheckAuth } from "./CheckAuth.tsx";

export const RouterProvider = () => {
	const mapRouteByAuthedUser = useCallback((routers: AppRouteObject[]) => {
		return routers.map(
			(route): RouteObject => ({
				path: route.path,
				element: route.private ? (
					<CheckAuth>{route.element}</CheckAuth>
				) : (
					route.element
				),
				children: route.children?.map(
					(childRoute: RouteObject & AppRouteType): RouteObject => ({
						path: childRoute.path,
						index: childRoute.index,
						element: childRoute.private ? (
							<CheckAuth>{childRoute.element}</CheckAuth>
						) : (
							childRoute.element
						),
					}),
				),
			}),
		);
	}, []);

	return (
		<BrowserRouter
			router={createBrowserRouter(mapRouteByAuthedUser(routeConfig))}
		/>
	);
};
