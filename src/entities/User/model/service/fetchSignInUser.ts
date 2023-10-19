import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, ValidateUserErrors } from "../types/types.ts";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { authorizationSelector } from "../selectors/authorization/authorizationSelector.ts";
import { userActions } from "@/entities/User";
import { validateUserSignIn } from "../../helpers/validateUserSignIn.ts";
import { AUTHORIZATION_ID_STORAGE_KEY } from "@/entities/User/const/authorization.ts";

export const fetchSignInUser = createAsyncThunk<
	User,
	void,
	ThunkConfig<ValidateUserErrors[]>
>(
	"user/fetchSignInUser",
	async (_, { rejectWithValue, extra, getState, dispatch }) => {
		const userState = authorizationSelector(getState());
		const validateErrors = validateUserSignIn({
			email: userState.email,
			password: userState.password,
		});

		if (validateErrors.length) {
			return rejectWithValue(validateErrors);
		}

		try {
			const { data, status } = await extra.api.get<User[]>("/users", {
				params: {
					email: userState.email,
					password: userState.password,
				},
			});

			if (status < 200 || status >= 300) {
				return rejectWithValue([ValidateUserErrors.SERVER_ERROR_WHILE_REQUEST]);
			}

			if (!data[0]) {
				return rejectWithValue([ValidateUserErrors.NOT_FIND_USER]);
			}

			localStorage.setItem(AUTHORIZATION_ID_STORAGE_KEY, data[0].id.toString());

			dispatch(
				userActions.setUser({
					id: data[0].id,
					name: data[0].name,
					email: data[0].email,
				}),
			);

			return data[0];
		} catch (err) {
			return rejectWithValue([ValidateUserErrors.SERVER_ERROR]);
		}
	},
);
