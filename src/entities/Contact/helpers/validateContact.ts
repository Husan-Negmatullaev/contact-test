import { Contact, ValidateContactErrors } from "../model/types/types.ts";
import { validateEmail } from "@/shared/helpers/validateEmail.ts";

export const validateContact = (
	contact?: Omit<Contact, "id">,
): ValidateContactErrors[] => {
	const errors: ValidateContactErrors[] = [];

	if (!contact) {
		errors.push(ValidateContactErrors.NO_DATA);
		return errors;
	}

	if (!contact.name) {
		errors.push(ValidateContactErrors.NO_USER_NAME);
	}

	if (!contact.email) {
		errors.push(ValidateContactErrors.NO_EMAIL);
	}

	if (!contact.surname) {
		errors.push(ValidateContactErrors.NO_SURNAME);
	}

	if (!contact.middleName) {
		errors.push(ValidateContactErrors.NO_MIDDLE_NAME);
	}

	if (!contact.phone) {
		errors.push(ValidateContactErrors.NO_PHONE);
	}

	if (contact.email && !validateEmail(contact.email)) {
		errors.push(ValidateContactErrors.NOT_CORRECT_EMAIL);
	}

	return errors;
};
