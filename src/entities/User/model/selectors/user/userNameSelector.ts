import { StateScheme } from "@/app/providers/StoreProvider";

export const userNameSelector = (state: StateScheme) => state.user.data?.name;
