import { FC, PropsWithChildren } from "react";
import { clsx } from "clsx";
import classes from "./Button.module.css";
import { ClassNameType } from "@/shared/types/types.ts";

type ButtonVariant = "primary" | "outline";

type ButtonProps = {
	buttonVariant?: ButtonVariant;
} & ClassNameType;

export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
	const { classNames, buttonVariant = "primary", children } = props;

	return (
		<button className={clsx(classes.button, classes[buttonVariant], classNames)}>
			{children}
		</button>
	);
};
