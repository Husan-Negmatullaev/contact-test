import { FC, useState, FormEvent, useCallback } from "react";
import { Modal } from "@/shared/ui/Modal/Modal.tsx";
import { Input } from "@/shared/ui/Input/Input.tsx";
import { Title } from "@/shared/ui/Title/Title.tsx";
import PlusIcon from "@/shared/assets/icons/plus.svg?react";

import { Button } from "@/shared/ui/Button/Button.tsx";
import modalClasses from "@/shared/ui/Modal/Modal.module.css";
import classes from "./AddContact.module.css";
import {
	Contact,
	Tag,
	TagItem,
	useAddContactMutation,
	validateContact,
	ValidateContactErrors,
} from "@/entities/Contact";
import { useSelector } from "react-redux";
import { userSelector } from "@/entities/User";
import { AddContactModalValidateForm } from "../AddContactModalValidateForm/AddContactModalValidateForm.tsx";

type AddContactProps = {
	opened?: boolean;
	onClose?: () => void;
};

export const AddContactModal: FC<AddContactProps> = (props) => {
	const { onClose, opened } = props;
	const user = useSelector(userSelector);
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [tags, setTags] = useState<Tag[]>([]);
	const [newTagQuery, setNewTagQuery] = useState("");
	const [errors, setErrors] = useState<ValidateContactErrors[]>([]);
	const [addContact] = useAddContactMutation();

	const handleResetAllFields = useCallback(() => {
		setName("");
		setTags([]);
		setEmail("");
		setPhone("");
		setSurname("");
		setMiddleName("");
		setErrors([]);
	}, []);

	const handleCloseModal = useCallback(() => {
		onClose?.();

		handleResetAllFields();
	}, [handleResetAllFields, onClose]);

	const handleSubmitNewContactForm = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (user?.id) {
			const contact: Omit<Contact, "id"> = {
				name,
				tags,
				email,
				phone,
				surname,
				middleName,
				userId: user.id,
			};

			const validateErrors = validateContact(contact);

			if (validateErrors.length) {
				return setErrors(validateErrors);
			}

			handleResetAllFields();
			addContact(contact);
		}
	};

	const handleAddNewTag = () => {
		if (newTagQuery && newTagQuery.trim()) {
			setTags((prevTags) => {
				const tags = [...prevTags];
				tags.push({
					id: Date.now(),
					title: newTagQuery,
				});

				return tags;
			});

			setNewTagQuery("");
		}
	};

	const handleRemoveTag = (tagId: number) => {
		setTags((prevState) => {
			return prevState.filter((tag) => tag.id !== tagId);
		});
	};

	return (
		<Modal opened={opened} onClose={handleCloseModal}>
			<Title
				align="center"
				titleElemVariant={"h3"}
				className={modalClasses.modalTitle}
			>
				Добавить контакт
			</Title>
			<form
				className={modalClasses.formModal}
				onSubmit={handleSubmitNewContactForm}
			>
				<div className={modalClasses.inputGroup}>
					<Input value={name} onChange={setName} labelTitle="Имя *" />
					<Input value={surname} onChange={setSurname} labelTitle="Фамилия *" />
					<Input
						value={middleName}
						onChange={setMiddleName}
						labelTitle="Отчество *"
					/>
				</div>
				<div className={modalClasses.inputGroup}>
					<Input value={phone} onChange={setPhone} labelTitle={"Номер Телефона *"} />
				</div>
				<div className={modalClasses.inputGroup}>
					<Input value={email} onChange={setEmail} labelTitle={"Email *"} />
				</div>
				<div className={modalClasses.inputGroup}>
					<Input value={newTagQuery} labelTitle={"Теги"} onChange={setNewTagQuery} />
					<Button
						buttonSizes="sm"
						buttonStyle="circle"
						onClick={handleAddNewTag}
						className={classes.addButton}
					>
						<PlusIcon />
					</Button>
				</div>
				<div className={classes.tags}>
					{tags.map((tag) => {
						return <TagItem onRemoveTag={handleRemoveTag} key={tag.id} tag={tag} />;
					})}
				</div>
				<div className={modalClasses.formModalActions}>
					<Button type="submit" variant={"outline"}>
						Создать
					</Button>
				</div>
			</form>
			<AddContactModalValidateForm validatedErrors={errors} />
		</Modal>
	);
};
