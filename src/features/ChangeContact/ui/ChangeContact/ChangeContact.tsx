import { FC, FormEvent, useEffect, useState } from "react";
import { clsx } from "clsx";
import {
	Contact,
	Tag,
	TagItem,
	validateContact,
	ValidateContactErrors,
	useGetContactByIdQuery,
	useUpdateContactMutation,
	parseContactsErrorsToText,
} from "@/entities/Contact";
import classes from "./ChangeContact.module.css";

import { Input } from "@/shared/ui/Input/Input.tsx";
import { Loader } from "@/shared/ui/Loader/Loader.tsx";
import { Button } from "@/shared/ui/Button/Button.tsx";
import { Title } from "@/shared/ui/Title/Title.tsx";
import PlusIcon from "@/shared/assets/icons/plus.svg?react";
import { ClassNameType } from "@/shared/types/types.ts";
import validateClasses from "@/shared/styles/ValidateErrorsStyles.module.css";

type ChangeContactProps = ClassNameType<{
	contactId: number;
}>;

export const ChangeContact: FC<ChangeContactProps> = (props) => {
	const { className, contactId } = props;
	const { data, isFetching, isLoading } = useGetContactByIdQuery({
		contactId: contactId,
	});
	const [queryTag, setQueryTag] = useState("");
	const [errors, setErrors] = useState<ValidateContactErrors[]>([]);
	const [canUpdateContact, setCanUpdateContact] = useState(false);
	const [updatedContact, setUpdatedContact] = useState<Contact | undefined>(
		data,
	);

	const [updateContact] = useUpdateContactMutation();

	const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const validatedErrors = validateContact(updatedContact);

		if (validatedErrors.length) {
			setErrors(validatedErrors);
		}

		if (!validatedErrors.length && updatedContact) {
			setErrors([]);
			setQueryTag("");
			setCanUpdateContact(false);
			updateContact(updatedContact);
		}
	};

	const handleUpdateContactByKey = (
		contactKey: keyof Contact,
		value: unknown,
	) => {
		setCanUpdateContact(true);
		setUpdatedContact((prevContact) => {
			if (prevContact) {
				return { ...prevContact, [contactKey]: value };
			}
			return prevContact;
		});
	};

	const handleAddNewTag = () => {
		setUpdatedContact((prevContact) => {
			if (prevContact?.tags && queryTag && queryTag.trim()) {
				const newTags: Tag[] = [
					...prevContact.tags,
					{
						id: Date.now(),
						title: queryTag,
					},
				];

				setCanUpdateContact(true);
				setQueryTag("");

				return {
					...prevContact,
					tags: newTags,
				};
			}
			return prevContact;
		});
	};

	const handleResetAllChanges = () => {
		setCanUpdateContact(false);
		setUpdatedContact(data);
	};

	useEffect(() => {
		if (data && !updatedContact) {
			setUpdatedContact(data);
		}
	}, [updatedContact, data]);

	if (isFetching || isLoading || !updatedContact) {
		return <Loader align="center" />;
	}

	return (
		<div className={clsx(classes.contact, className)}>
			<Title
				align="center"
				titleElemVariant="h1"
				className={classes.contact__title}
			>
				Изменить контакт
			</Title>
			<form onSubmit={handleSubmitForm} className={classes.contact__form}>
				<div className={clsx(classes.contact__group, classes.contact__group_3)}>
					<Input
						labelTitle="Имя"
						value={updatedContact?.name}
						onChange={(value) => handleUpdateContactByKey("name", value)}
					/>
					<Input
						labelTitle="Фамилия"
						value={updatedContact?.surname}
						onChange={(value) => handleUpdateContactByKey("surname", value)}
					/>
					<Input
						labelTitle="Отчество"
						value={updatedContact?.middleName}
						onChange={(value) => handleUpdateContactByKey("middleName", value)}
					/>
				</div>
				<div className={clsx(classes.contact__group, classes.contact__group_2)}>
					<Input
						labelTitle="Номер телефона"
						value={updatedContact?.phone}
						onChange={(value) => handleUpdateContactByKey("phone", value)}
					/>
					<Input
						labelTitle="Email"
						value={updatedContact?.email}
						onChange={(value) => handleUpdateContactByKey("email", value)}
					/>
				</div>
				<div
					className={clsx(
						classes.contact__group,
						classes.contact__group_2,
						classes.contact__groupButton,
					)}
				>
					<Input value={queryTag} labelTitle="Теги" onChange={setQueryTag} />
					<Button
						buttonSizes="sm"
						onClick={handleAddNewTag}
						buttonStyle="circle"
						className={classes.contact__addButton}
					>
						<PlusIcon />
					</Button>
				</div>
				<div className={classes.contact__tags}>
					{updatedContact?.tags.map((tagItem) => {
						return <TagItem key={tagItem.id} tag={tagItem} />;
					})}
				</div>
				<div className={classes.contact__actions}>
					<Button
						variant="warning"
						disabled={!canUpdateContact}
						onClick={handleResetAllChanges}
					>
						Вернуть
					</Button>
					<Button type="submit">Сохранить</Button>
				</div>
			</form>
			{!!errors.length && (
				<div className={validateClasses.error}>
					{errors.map((error) => (
						<span key={error} className={validateClasses.error__item}>
							{parseContactsErrorsToText[error]}
						</span>
					))}
				</div>
			)}
		</div>
	);
};
