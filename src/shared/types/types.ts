export type ClassNameType<T = {}> = {
	className?: string;
} & T;

export type ClassNameProps = {
	isActive: boolean;
	isPending: boolean;
};
