import { StateScheme } from "./StateSchema.ts";
import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { $api } from "@/shared/configs/axios/axios.ts";
import { contactApi } from "@/entities/Contact";
import { authorizationReducer, userReducer } from "@/entities/User";

export const createReduxStore = (initialState?: StateScheme) => {
	const rootReducers: ReducersMapObject<StateScheme> = {
		user: userReducer,
		authorization: authorizationReducer,
		[contactApi.reducerPath]: contactApi.reducer,
	};

	const store = configureStore({
		reducer: rootReducers,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: {
						api: $api,
					},
				},
			}).concat(contactApi.middleware),
	});

	setupListeners(store.dispatch);

	return store;
};

// export const store = createReduxStore();

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
