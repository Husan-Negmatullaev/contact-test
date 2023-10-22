import { AddContactModal } from "@/features/AddContactModal";
import {
	ListContacts,
	useDeleteContactMutation,
	useGetAllContactsQuery,
} from "@/entities/Contact";
import { Title } from "@/shared/ui/Title/Title.tsx";
import { useSelector } from "react-redux";
import { userSelector } from "@/entities/User";
import { FC, useCallback, useState } from "react";
import { ClassNameType } from "@/shared/types/types.ts";
import { clsx } from "clsx";
import { Input } from "@/shared/ui/Input/Input.tsx";
import classes from "./ListContactsWithSearchInput.module.css";
import { useDebounce } from "@/shared/hooks/useDebounce.ts";

type ListContactsWithFilterInputProps = ClassNameType<{}>;

export const ListContactsWithSearchInput: FC<
	ListContactsWithFilterInputProps
> = (props) => {
	const { className } = props;
	const user = useSelector(userSelector);
	const [searchValue, setSearchValue] = useState("");
	const debouncedSearchValue = useDebounce<string>(searchValue, 500);
	const [deleteContact] = useDeleteContactMutation();
	const [isOpenModalAddContact, setIsOpenModalContact] = useState(false);

	const { data, isFetching, isLoading, refetch } = useGetAllContactsQuery(
		{
			userId: user?.id,
			searchQuery: debouncedSearchValue,
		},
		{
			refetchOnMountOrArgChange: true,
		},
	);

	const handleDeleteContact = useCallback(
		(contactId: number) => {
			deleteContact(contactId);
		},
		[deleteContact],
	);

	return (
		<div className={clsx(classes.list, className)}>
			{user?.id && (
				<>
					<Input
						labelTitle="Поиск"
						value={searchValue}
						onChange={setSearchValue}
						placeholder="Поиск в списке"
						className={classes.list__search}
					/>
					<AddContactModal
						opened={isOpenModalAddContact}
						onClose={() => setIsOpenModalContact(false)}
					/>
				</>
			)}
			{user?.id ? (
				<div className={classes.list__body}>
					<ListContacts
						contacts={data}
						isLoading={isFetching}
						isFirstLoading={isLoading}
						updateListContacts={refetch}
						deleteContact={handleDeleteContact}
						openAddContact={() => setIsOpenModalContact(true)}
					/>
				</div>
			) : (
				<Title titleElemVariant="h1" align="center">
					Пожалуйста зарегистрируйтесь или войдите в систему!
				</Title>
			)}
		</div>
	);
};
