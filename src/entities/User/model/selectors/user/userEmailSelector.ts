import { StateScheme } from "@/app/providers/StoreProvider";

export const userEmailSelector = (state: StateScheme) => state.user.data?.email;
