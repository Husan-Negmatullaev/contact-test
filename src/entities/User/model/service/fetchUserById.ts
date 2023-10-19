import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types/types.ts";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { AUTHORIZATION_ID_STORAGE_KEY } from "@/entities/User/const/authorization.ts";

export const fetchUserById = createAsyncThunk<User, void, ThunkConfig<void>>(
	"user/fetchUserById",
	async (_, { extra }) => {
		const userId = localStorage.getItem(AUTHORIZATION_ID_STORAGE_KEY);

		if (!userId) {
			return;
		}

		try {
			const { data } = await extra.api.get("/users", {
				params: {
					id: userId,
				},
			});

			if (!data[0]) {
				return;
			}

			return data[0];
		} catch (err) {
			return;
		}
	},
);
