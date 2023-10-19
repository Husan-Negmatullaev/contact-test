import { DeepPartial } from "@reduxjs/toolkit";

export type User = {
	id: number;
	name: string;
	email: string;
	password?: string;
};

export type AuthorizationSchema = {
	isLoading: boolean;
	data: DeepPartial<User>;
	validateSignInForm?: ValidateUserErrors[];
	validateSignOnForm?: ValidateUserErrors[];
};

export type UserSchema = {
	data?: User;
	_mounted: boolean;
	isLoading: boolean;
	error?: ValidateUserErrors[];
};

export enum ValidateUserErrors {
	NO_DATA = "NO_DATA",
	NO_EMAIL = "NO_EMAIL",
	NO_PASSWORD = "NO_PASSWORD",
	SERVER_ERROR = "SERVER_ERROR",
	NO_USER_NAME = "NO_USER_NAME",
	NOT_FIND_USER = "NOT_FIND_USER",
	NOT_CORRECT_EMAIL = "NOT_CORRECT_EMAIL",
	PASSWORD_MUST_BE_LONGER = "PASSWORD_MUST_BE_LONGER",
	SERVER_ERROR_WHILE_REQUEST = "SERVER_ERROR_WHILE_REQUEST",
}
