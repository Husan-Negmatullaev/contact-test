import { RouteObject } from "react-router-dom";
import { BaseLayout } from "@/widgets/BaseLayout";
import { HomePage } from "@/pages/HomePage";
import { ContactPage } from "../../../../pages/ContactPage";
import { AuthenticationPage } from "@/pages/AuthenticationPage";
import { AuthorizationPage } from "@/pages/AuthorizationPage";
import { AppRoute } from "@/shared/configs/appRouteConfigs.ts";

export type AppRouteType = Omit<RouteObject, "path" | "children"> & {
	path: AppRoute;
	private?: boolean;
	children?: (RouteObject & {
		private?: boolean;
	})[];
};

export const routeConfig: AppRouteType[] = [
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
		path: AppRoute.sign_in,
		element: <AuthenticationPage />,
	},
	{
		path: AppRoute.sign_on,
		element: <AuthorizationPage />,
	},
];
