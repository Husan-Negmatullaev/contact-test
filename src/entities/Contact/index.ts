export type { Contact, Tag } from "./model/types/types.ts";

export { contacts } from "./mock/contacts.ts";

export { ListContacts } from "./ui/ListContacts/ListContacts.tsx";
export { ContactItem } from "./ui/ContactItem/ContactItem.tsx";
export { TagItem } from "./ui/TagItem/TagItem.tsx";

export { validateContact } from "./helpers/validateContact.ts";
export { ValidateContactErrors } from "./model/types/types.ts";

export { parseContactsErrorsToText } from "./const/parseContactsErrorsToText.ts";

export {
	contactApi,
	useAddContactMutation,
	useGetAllContactsQuery,
	useGetContactByIdQuery,
	useUpdateContactMutation,
	useDeleteContactMutation,
} from "./model/services/contactApi.ts";
