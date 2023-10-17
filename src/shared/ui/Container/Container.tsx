import { FC, PropsWithChildren } from "react";
import { clsx } from "clsx";
import { ClassNameType } from "../../types/types.ts";
import classes from "./Container.module.css";

export const Container: FC<ClassNameType<PropsWithChildren>> = (props) => {
	const { children, classNames } = props;

	return <div className={clsx(classes.container, classNames)}>{children}</div>;
};
