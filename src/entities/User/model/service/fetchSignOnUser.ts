import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, ValidateUserErrors } from "../types/types.ts";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { authorizationSelector } from "../selectors/authorization/authorizationSelector.ts";
import { userActions } from "@/entities/User";
import { validateUserSignOn } from "../../helpers/validateUserSignOn.ts";
import { AUTHORIZATION_ID_STORAGE_KEY } from "@/entities/User/const/authorization.ts";

export const fetchSignOnUser = createAsyncThunk<
	User,
	void,
	ThunkConfig<ValidateUserErrors[]>
>(
	"user/fetchSignOnUser",
	async (_, { rejectWithValue, extra, getState, dispatch }) => {
		const authorizationData = authorizationSelector(getState());
		const validateErrors = validateUserSignOn(authorizationData);

		if (validateErrors.length) {
			return rejectWithValue(validateErrors);
		}

		try {
			const { data, status } = await extra.api.post<User>(
				"/users",
				authorizationData,
			);

			if (status < 200 || status >= 300) {
				return rejectWithValue([ValidateUserErrors.SERVER_ERROR_WHILE_REQUEST]);
			}

			localStorage.setItem(AUTHORIZATION_ID_STORAGE_KEY, data.id.toString());

			dispatch(
				userActions.setUser({
					id: data.id,
					name: data.name,
					email: data.email,
				}),
			);

			return data;
		} catch (err) {
			return rejectWithValue([ValidateUserErrors.SERVER_ERROR]);
		}
	},
);
