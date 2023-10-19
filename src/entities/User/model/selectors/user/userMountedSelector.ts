import { StateScheme } from "@/app/providers/StoreProvider";

export const userMountedSelector = (state: StateScheme) => state.user._mounted;
