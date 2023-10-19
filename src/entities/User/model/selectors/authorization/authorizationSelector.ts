import { StateScheme } from "@/app/providers/StoreProvider";

export const authorizationSelector = (state: StateScheme) =>
	state.authorization.data;
