export type ClassNameType<T = {}> = {
	classNames?: string;
} & T;

export type ClassNameProps = {
	isActive: boolean;
	isPending: boolean;
};
