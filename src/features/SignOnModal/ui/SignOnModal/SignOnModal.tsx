import { FC, FormEvent, useCallback } from "react";
import { Modal } from "@/shared/ui/Modal/Modal.tsx";
import { Input } from "@/shared/ui/Input/Input.tsx";
import { Title } from "@/shared/ui/Title/Title.tsx";
import modalClasses from "@/shared/ui/Modal/Modal.module.css";
import { Button } from "@/shared/ui/Button/Button.tsx";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch.ts";
import {
	authorizationActions,
	authorizationEmailSelector,
	authorizationLoadingSelector,
	authorizationNameSelector,
	authorizationPasswordSelector,
	authorizationValidateSignOnErrorsSelector,
	fetchSignOnUser,
} from "@/entities/User";
import { useSelector } from "react-redux";
import { SignOnModalFormError } from "../SignOnModalFormError/SignOnModalFormError.tsx";

type SignOnModalModalProps = {
	opened?: boolean;
	onClose?: () => void;
};

export const SignOnModal: FC<SignOnModalModalProps> = (props) => {
	const { onClose, opened } = props;
	const dispatch = useAppDispatch();
	const name = useSelector(authorizationNameSelector);
	const email = useSelector(authorizationEmailSelector);
	const password = useSelector(authorizationPasswordSelector);
	const isLoadingSignInUser = useSelector(authorizationLoadingSelector);
	const validateErrors = useSelector(authorizationValidateSignOnErrorsSelector);

	const handleCloseModal = useCallback(() => {
		onClose?.();
		dispatch(authorizationActions.resetAuthorization());
	}, [dispatch, onClose]);

	const handleSubmitSignInForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await dispatch(fetchSignOnUser());
		if (response.meta.requestStatus === "fulfilled") {
			handleCloseModal();
		}
	};
	const handleChangeUserName = (value: string) => {
		dispatch(authorizationActions.setUserName(value));
	};

	const handleChangeUserEmail = (value: string) => {
		dispatch(authorizationActions.setUserEmail(value));
	};

	const handleChangeUserPassword = (value: string) => {
		dispatch(authorizationActions.setUserPassword(value));
	};

	return (
		<Modal opened={opened} onClose={handleCloseModal}>
			<Title
				align={"center"}
				titleElemVariant={"h3"}
				className={modalClasses.modalTitle}
			>
				Регистрация
			</Title>
			<form onSubmit={handleSubmitSignInForm} className={modalClasses.formModal}>
				<div className={modalClasses.inputGroup}>
					<Input
						value={name}
						labelTitle="Имя пользователя"
						disabled={isLoadingSignInUser}
						onChange={handleChangeUserName}
					/>
				</div>
				<div className={modalClasses.inputGroup}>
					<Input
						value={email}
						labelTitle="Email"
						disabled={isLoadingSignInUser}
						onChange={handleChangeUserEmail}
					/>
				</div>
				<div className={modalClasses.inputGroup}>
					<Input
						type="password"
						value={password}
						labelTitle="Пароль"
						disabled={isLoadingSignInUser}
						onChange={handleChangeUserPassword}
					/>
				</div>
				<div className={modalClasses.formModalActions}>
					<Button type="submit" variant={"outline"}>
						Регистрация
					</Button>
				</div>
			</form>
			<SignOnModalFormError validatedErrors={validateErrors} />
		</Modal>
	);
};
