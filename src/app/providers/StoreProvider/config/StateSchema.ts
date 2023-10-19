import { AxiosInstance } from "axios";
import { AuthorizationSchema, UserSchema } from "@/entities/User";
import { contactApi } from "@/entities/Contact";

export type StateScheme = {
	user: UserSchema;
	authorization: AuthorizationSchema;
	[contactApi.reducerPath]: ReturnType<typeof contactApi.reducer>;
};

export type ThunkExtraArg = {
	api: AxiosInstance;
};

export type ThunkConfig<T> = {
	rejectValue: T;
	extra: ThunkExtraArg;
	state: StateScheme;
};
