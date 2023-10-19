import { FC } from "react";
import { DeepPartial } from "@reduxjs/toolkit";
import { ValidateUserErrors } from "@/entities/User";
import { ClassNameType } from "@/shared/types/types.ts";
import { clsx } from "clsx";
import validateClasses from "@/shared/styles/ValidateErrorsStyles.module.css";

type SignOnModalFormErrorProps = ClassNameType<{
	validatedErrors?: ValidateUserErrors[];
}>;

const parseErrorsToText: DeepPartial<Record<ValidateUserErrors, string>> = {
	[ValidateUserErrors.NO_EMAIL]: "Email обязателен",
	[ValidateUserErrors.NO_PASSWORD]: "Пароль обязателен",
	[ValidateUserErrors.NO_USER_NAME]: "Имя пользователя обязательна",
	[ValidateUserErrors.NO_DATA]: "Заполните все поля",
	[ValidateUserErrors.NOT_CORRECT_EMAIL]: "Не валидная почта",
	[ValidateUserErrors.PASSWORD_MUST_BE_LONGER]:
		"Пароль должен быть больше 6 символов",
};

export const SignOnModalFormError: FC<SignOnModalFormErrorProps> = (props) => {
	const { validatedErrors, className } = props;

	if (!validatedErrors) {
		return null;
	}

	return (
		<div className={clsx(validateClasses.error, className)}>
			{validatedErrors.map((error) => (
				<span key={error} className={validateClasses.error__item}>
					{parseErrorsToText[error]}
				</span>
			))}
		</div>
	);
};
