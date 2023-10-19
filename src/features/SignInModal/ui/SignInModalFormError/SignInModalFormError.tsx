import { FC } from "react";
import { DeepPartial } from "@reduxjs/toolkit";
import { ValidateUserErrors } from "@/entities/User";
import { ClassNameType } from "@/shared/types/types.ts";
import { clsx } from "clsx";
import validateClasses from "@/shared/styles/ValidateErrorsStyles.module.css";

type SignInModalFormErrorProps = ClassNameType<{
	validatedErrors?: ValidateUserErrors[];
}>;

const parseErrorsToText: DeepPartial<Record<ValidateUserErrors, string>> = {
	[ValidateUserErrors.NO_PASSWORD]: "Пароль обязателен",
	[ValidateUserErrors.NO_EMAIL]: "Email обязателен",
	[ValidateUserErrors.NOT_FIND_USER]: "Не найден пользователь",
};

export const SignInModalFormError: FC<SignInModalFormErrorProps> = (props) => {
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
