import { StateScheme } from "@/app/providers/StoreProvider";

export const authorizationPasswordSelector = (state: StateScheme) =>
	state.authorization.data.password;
