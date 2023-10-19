import React from "react";
import { Provider } from "react-redux";
import { StateScheme } from "../config/StateSchema.ts";
import { createReduxStore } from "../config/store.ts";

interface StoreProviderProps {
	children: React.ReactNode;
	initialState?: StateScheme;
}

export const StoreProvider = (props: StoreProviderProps) => {
	const { initialState, children } = props;

	const store = createReduxStore(initialState);

	return <Provider store={store}>{children}</Provider>;
};
