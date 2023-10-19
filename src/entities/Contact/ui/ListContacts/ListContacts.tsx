import { FC } from "react";
import { Contact } from "../../model/types/types.ts";
import PlusIcon from "@/shared/assets/icons/plus.svg?react";
import RefreshIcon from "@/shared/assets/icons/refresh.svg?react";
import { Button } from "@/shared/ui/Button/Button.tsx";
import classes from "./ListContacts.module.css";
import { ContactItem } from "@/entities/Contact";
import { Loader } from "@/shared/ui/Loader/Loader.tsx";

type ListContactsProps = {
	isLoading?: boolean;
	contacts?: Contact[];
	isFirstLoading?: boolean;
	openAddContact?: () => void;
	updateListContacts?: () => void;
};

export const ListContacts: FC<ListContactsProps> = (props) => {
	const {
		isFirstLoading,
		isLoading = false,
		contacts,
		openAddContact,
		updateListContacts,
	} = props;

	if (isFirstLoading) {
		return <Loader align="center" />;
	}

	if (!contacts?.length && !isLoading) {
		return (
			<Button
				variant={"primary"}
				className={classes.addContact}
				onClick={() => openAddContact?.()}
			>
				<div className={classes.addContact__body}>
					<h2 className={classes.addContact__title}>Добавить контакт</h2>
					<PlusIcon className={classes.addContact__icon} />
				</div>
			</Button>
		);
	}

	return (
		<div className={classes.contacts}>
			<div className={classes.contacts__header}>
				<Button
					variant="info"
					buttonSizes="sm"
					buttonStyle="circle"
					onClick={updateListContacts}
					className={classes.contacts__refresh}
				>
					<RefreshIcon />
				</Button>
				<Button
					buttonSizes="sm"
					variant="primary"
					buttonStyle="circle"
					onClick={openAddContact}
					className={classes.contacts__refresh}
				>
					<PlusIcon />
				</Button>
			</div>
			<div className={classes.contacts__list}>
				{contacts?.map((contactItem) => (
					<ContactItem key={contactItem.id} contact={contactItem} />
				))}
			</div>
		</div>
	);
};
