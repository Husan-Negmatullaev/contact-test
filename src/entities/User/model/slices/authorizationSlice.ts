import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthorizationSchema } from "../types/types.ts";
import { fetchSignInUser, fetchSignOnUser } from "@/entities/User";

const initialState: AuthorizationSchema = {
	data: {
		name: "",
		email: "",
		password: "",
	},
	isLoading: false,
	validateSignInForm: undefined,
	validateSignOnForm: undefined,
};

const authorization = createSlice({
	name: "authorization",
	initialState,
	reducers: {
		setUserEmail: (state, action: PayloadAction<string>) => {
			state.data.email = action.payload;
		},
		setUserPassword: (state, action: PayloadAction<string>) => {
			state.data.password = action.payload;
		},
		setUserName: (state, action: PayloadAction<string>) => {
			state.data.name = action.payload;
		},
		resetAuthorization: (state) => {
			state.data.name = "";
			state.data.email = "";
			state.data.password = "";
			state.validateSignInForm = undefined;
			state.validateSignOnForm = undefined;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchSignInUser.pending, (state) => {
			state.isLoading = true;
			state.validateSignInForm = undefined;
		});
		builder.addCase(fetchSignInUser.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(fetchSignInUser.rejected, (state, action) => {
			state.isLoading = false;
			state.validateSignInForm = action.payload;
		});

		builder.addCase(fetchSignOnUser.pending, (state) => {
			state.isLoading = true;
			state.validateSignOnForm = undefined;
		});
		builder.addCase(fetchSignOnUser.fulfilled, (state) => {
			state.isLoading = false;
		});
		builder.addCase(fetchSignOnUser.rejected, (state, action) => {
			state.isLoading = false;
			state.validateSignOnForm = action.payload;
		});
	},
});

export const { reducer: authorizationReducer } = authorization;
export const { actions: authorizationActions } = authorization;
