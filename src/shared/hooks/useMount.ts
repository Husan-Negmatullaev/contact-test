import { useEffect, useState } from "react";

type UseMountArgs = {
	opened?: boolean;
	mountedInterval?: number;
};

export const useMount = (args: UseMountArgs) => {
	const { mountedInterval = 500, opened } = args;
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (opened && !mounted) {
			setMounted(true);
		} else if (!opened && mounted) {
			setTimeout(() => {
				setMounted(false);
			}, mountedInterval);
		}
	}, [mounted, mountedInterval, opened]);

	return {
		mounted,
	};
};
