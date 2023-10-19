import { StateScheme } from "@/app/providers/StoreProvider";

export const authorizationValidateSignOnErrorsSelector = (state: StateScheme) =>
	state.authorization.validateSignOnForm;
