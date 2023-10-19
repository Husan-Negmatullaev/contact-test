import { User } from "@/entities/User";
import { ValidateUserErrors } from "@/entities/User/model/types/types.ts";
import { DeepPartial } from "@reduxjs/toolkit";
import { validateEmail } from "@/shared/helpers/validateEmail.ts";

export const validateUserSignOn = (
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

	if (!user.name) {
		errors.push(ValidateUserErrors.NO_USER_NAME);
	}

	if (user.password && !(user.password?.length > 6)) {
		errors.push(ValidateUserErrors.PASSWORD_MUST_BE_LONGER);
	}

	if (user.email && !validateEmail(user.email)) {
		errors.push(ValidateUserErrors.NOT_CORRECT_EMAIL);
	}

	return errors;
};
