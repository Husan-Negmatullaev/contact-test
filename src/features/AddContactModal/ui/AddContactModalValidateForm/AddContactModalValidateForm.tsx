import { FC } from "react";
import { ClassNameType } from "@/shared/types/types.ts";
import { clsx } from "clsx";
import validateClasses from "@/shared/styles/ValidateErrorsStyles.module.css";
import {
	parseContactsErrorsToText,
	ValidateContactErrors,
} from "@/entities/Contact";

type AddContactModalValidateFormProps = ClassNameType<{
	validatedErrors?: ValidateContactErrors[];
}>;

export const AddContactModalValidateForm: FC<
	AddContactModalValidateFormProps
> = (props) => {
	const { validatedErrors, className } = props;

	if (!validatedErrors) {
		return null;
	}

	return (
		<div className={clsx(validateClasses.error, className)}>
			{validatedErrors.map((error) => (
				<span key={error} className={validateClasses.error__item}>
					{parseContactsErrorsToText[error]}
				</span>
			))}
		</div>
	);
};
