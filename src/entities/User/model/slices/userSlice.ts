import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserSchema } from "../types/types.ts";
import { fetchUserById } from "../service/fetchUserById.ts";

const initialState: UserSchema = {
	data: undefined,
	_mounted: false,
	isLoading: false,
};

const user = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.data = action.payload;
		},
		resetUser: (state) => {
			state.data = undefined;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserById.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchUserById.fulfilled, (state, action) => {
			state._mounted = true;
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchUserById.rejected, (state) => {
			state._mounted = true;
			state.isLoading = false;
		});
	},
});

export const { reducer: userReducer } = user;
export const { actions: userActions } = user;
