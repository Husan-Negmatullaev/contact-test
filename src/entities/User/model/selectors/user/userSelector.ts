import { StateScheme } from "@/app/providers/StoreProvider";

export const userSelector = (state: StateScheme) => state.user.data;
