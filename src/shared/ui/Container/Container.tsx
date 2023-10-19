import { FC, PropsWithChildren } from "react";
import { clsx } from "clsx";
import { ClassNameType } from "../../types/types.ts";
import classes from "./Container.module.css";

type ContainerProps = ClassNameType<{
	min?: boolean;
}>;
export const Container: FC<PropsWithChildren<ContainerProps>> = (props) => {
	const { children, className, min } = props;

	return (
		<div className={clsx(classes.container, min && classes.min, className)}>
			{children}
		</div>
	);
};
