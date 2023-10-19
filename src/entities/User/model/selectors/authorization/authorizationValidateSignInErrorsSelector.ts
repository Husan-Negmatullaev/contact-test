import { StateScheme } from "@/app/providers/StoreProvider";

export const authorizationValidateSignInErrorsSelector = (state: StateScheme) =>
	state.authorization.validateSignInForm;
