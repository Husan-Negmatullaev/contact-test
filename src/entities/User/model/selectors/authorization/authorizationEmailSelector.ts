import { StateScheme } from "@/app/providers/StoreProvider";

export const authorizationEmailSelector = (state: StateScheme) =>
	state.authorization.data.email;
