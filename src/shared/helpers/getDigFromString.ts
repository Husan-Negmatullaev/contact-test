export const getDigFromString = (value: string): number => {
	return parseInt(value.replace(/[^\d]/g, ""));
};
