import { StateScheme } from "@/app/providers/StoreProvider";

export const authorizationNameSelector = (state: StateScheme) =>
	state.authorization.data.name;
