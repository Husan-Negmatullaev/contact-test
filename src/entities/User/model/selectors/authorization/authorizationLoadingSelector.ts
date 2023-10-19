import { StateScheme } from "@/app/providers/StoreProvider";

export const authorizationLoadingSelector = (state: StateScheme) =>
	state.authorization.isLoading;
