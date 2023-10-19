import { DeepPartial } from "@reduxjs/toolkit";
import { ValidateContactErrors } from "../model/types/types.ts";

export const parseContactsErrorsToText: DeepPartial<
	Record<ValidateContactErrors, string>
> = {
	[ValidateContactErrors.NO_DATA]: "ЗАПОЛНИТЕ ВСЕ ПОЛЯ",
	[ValidateContactErrors.NO_SURNAME]: "ЗАПОЛНИТЕ ПОЛЕ С ФАМИЛИЕМ",
	[ValidateContactErrors.NO_USER_NAME]: "ЗАПОЛНИТЕ ПОЛЕ С ИМЕНЕМ",
	[ValidateContactErrors.NOT_CORRECT_EMAIL]: "НЕ КОРРЕКТНАЯ ПОЧТА",
	[ValidateContactErrors.NO_PHONE]: "ЗАПОЛНИТЕ ПОЛЕ С НОМЕРОМ ТЕЛОФОНА",
	[ValidateContactErrors.NO_MIDDLE_NAME]: "ЗАПОЛНИТЕ ПОЛЕ С ОТЧЕСТВОМ",
	[ValidateContactErrors.SERVER_ERROR]: "СЕРВЕРНАЯ ОШИБКА",
	[ValidateContactErrors.NO_EMAIL]: "ЗАПОЛНИТЕ ПОЛЕ С ПОЧТОЙ",
};
