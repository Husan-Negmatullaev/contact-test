import { FC, FormEvent, useCallback } from "react";
import { Modal } from "@/shared/ui/Modal/Modal.tsx";
import { Input } from "@/shared/ui/Input/Input.tsx";
import { Title } from "@/shared/ui/Title/Title.tsx";
import modalClasses from "@/shared/ui/Modal/Modal.module.css";
import { Button } from "@/shared/ui/Button/Button.tsx";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch.ts";
import {
	authorizationActions,
	fetchSignInUser,
	authorizationEmailSelector,
	authorizationLoadingSelector,
	authorizationPasswordSelector,
	authorizationValidateSignInErrorsSelector,
} from "@/entities/User";
import { useSelector } from "react-redux";
import { SignInModalFormError } from "../SignInModalFormError/SignInModalFormError.tsx";

type SignInModalProps = {
	opened?: boolean;
	onClose?: () => void;
};

export const SignInModal: FC<SignInModalProps> = (props) => {
	const { onClose, opened } = props;
	const dispatch = useAppDispatch();
	const isLoadingSignInUser = useSelector(authorizationLoadingSelector);
	const email = useSelector(authorizationEmailSelector);
	const password = useSelector(authorizationPasswordSelector);
	const validateErrors = useSelector(authorizationValidateSignInErrorsSelector);

	const handleCloseModal = useCallback(() => {
		onClose?.();
		dispatch(authorizationActions.resetAuthorization());
	}, [dispatch, onClose]);

	const handleSubmitSignInForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const response = await dispatch(fetchSignInUser());
		if (response.meta.requestStatus === "fulfilled") {
			handleCloseModal();
		}
	};

	const handleChangeEmail = (value: string) => {
		dispatch(authorizationActions.setUserEmail(value));
	};

	const handleChangePassword = (value: string) => {
		dispatch(authorizationActions.setUserPassword(value));
	};

	return (
		<Modal opened={opened} onClose={handleCloseModal}>
			<Title
				align={"center"}
				titleElemVariant={"h3"}
				className={modalClasses.modalTitle}
			>
				Вход
			</Title>
			<form onSubmit={handleSubmitSignInForm} className={modalClasses.formModal}>
				<div className={modalClasses.inputGroup}>
					<Input
						value={email}
						labelTitle="Email"
						onChange={handleChangeEmail}
						disabled={isLoadingSignInUser}
					/>
				</div>
				<div className={modalClasses.inputGroup}>
					<Input
						type="password"
						value={password}
						labelTitle="Пароль"
						disabled={isLoadingSignInUser}
						onChange={handleChangePassword}
					/>
				</div>
				<div className={modalClasses.formModalActions}>
					<Button type="submit" variant={"outline"}>
						Вход
					</Button>
				</div>
			</form>
			<SignInModalFormError validatedErrors={validateErrors} />
		</Modal>
	);
};
