import { RouteObject } from "react-router-dom";
import { BaseLayout } from "@/widgets/BaseLayout";
import { HomePage } from "@/pages/HomePage";
import { ContactPage } from "@/pages/ContactPage";
import { AppRoute } from "@/shared/configs/routeConfig/appRouteConfigs.ts";
import { ForbiddenPage } from "@/pages/ForbiddenPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export type AppRouteType = {
	private?: boolean;
	path?: AppRoute | string;
};

export type AppRouteObject = Omit<RouteObject, "path" | "children"> & {
	private?: boolean;
	path?: AppRoute | string;
	children?: (RouteObject & AppRouteType)[];
};

export const routeConfig: AppRouteObject[] = [
	{
		path: AppRoute.home,
		element: <BaseLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				private: true,
				path: AppRoute.contact + "/:id",
				element: <ContactPage />,
			},
		],
	},
	{
		path: AppRoute.forbidden,
		element: <ForbiddenPage />,
	},
	{
		path: AppRoute.error,
		element: <NotFoundPage />,
	},
];
