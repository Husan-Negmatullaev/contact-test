import { Contact } from "../../model/types/types.ts";
import { FC } from "react";
import { ClassNameType } from "@/shared/types/types.ts";

type ListContactsProps = {
	contacts?: Contact[];
	updateListContacts?: () => void;
};

export const ListContacts: FC<ClassNameType<ListContactsProps>> = (props) => {
	const { contacts, updateListContacts } = props;

	return <div>List Contacts</div>;
};
