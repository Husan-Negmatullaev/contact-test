export type Tag = {
	id: number;
	title: string;
};

export type Contact = {
	id: number;
	tags: Tag[];
	name: string;
	email: string;
	phone: string;
	userId: number;
	surname: string;
	middleName: string;
};

export type GetAllContactsQueryArgs = {
	userId?: number;
};

export type GetContactByIdQueryArgs = {
	contactId: number;
};

export enum ValidateContactErrors {
	NO_DATA = "NO_DATA",
	NO_EMAIL = "NO_EMAIL",
	NO_PHONE = "NO_PHONE",
	NO_SURNAME = "NO_SURNAME",
	SERVER_ERROR = "SERVER_ERROR",
	NO_USER_NAME = "NO_USER_NAME",
	NOT_CORRECT_EMAIL = "NOT_CORRECT_EMAIL",
	NO_MIDDLE_NAME = "NO_MIDDLE_NAME",
}

// export type ContactSliceSchema = {
// 	error?: string;
// 	data?: Contact[];
// 	newContactData?: Contact;
// 	updateContactData?: Contact;
// };
