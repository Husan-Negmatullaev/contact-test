import { FC } from "react";
import { Contact } from "../../model/types/types.ts";
import PlusIcon from "@/shared/assets/icons/plus.svg?react";
import RefreshIcon from "@/shared/assets/icons/refresh.svg?react";
import { Button } from "@/shared/ui/Button/Button.tsx";
import classes from "./ListContacts.module.css";
import { ContactItem } from "@/entities/Contact";
import { Loader } from "@/shared/ui/Loader/Loader.tsx";
import { clsx } from "clsx";
import { Title } from "@/shared/ui/Title/Title.tsx";

type ListContactsProps = {
	isLoading?: boolean;
	contacts?: Contact[];
	isFirstLoading?: boolean;
	openAddContact?: () => void;
	updateListContacts?: () => void;
};

export const ListContacts: FC<ListContactsProps> = (props) => {
	const {
		contacts,
		isLoading,
		isFirstLoading,
		openAddContact,
		updateListContacts,
	} = props;

	if (isFirstLoading) {
		return <Loader align="center" />;
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
			<div
				className={clsx(
					classes.contacts__list,
					isLoading && classes.contacts__list_loading,
				)}
			>
				{contacts?.map((contactItem) => (
					<ContactItem key={contactItem.id} contact={contactItem} />
				))}

				{!contacts?.length && (
					<Title align="center" titleElemVariant="h3">
						Нету контактов
					</Title>
				)}
			</div>
		</div>
	);
};
