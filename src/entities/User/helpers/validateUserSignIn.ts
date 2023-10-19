import { User } from "@/entities/User";
import { ValidateUserErrors } from "@/entities/User/model/types/types.ts";
import { DeepPartial } from "@reduxjs/toolkit";

export const validateUserSignIn = (
	user?: DeepPartial<Pick<User, "name" | "password" | "email">>,
): ValidateUserErrors[] => {
	const errors: ValidateUserErrors[] = [];

	if (!user) {
		errors.push(ValidateUserErrors.NO_DATA);
		return errors;
	}

	if (!user.password) {
		errors.push(ValidateUserErrors.NO_PASSWORD);
	}

	if (!user.email) {
		errors.push(ValidateUserErrors.NO_EMAIL);
	}

	return errors;
};
