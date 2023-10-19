import { FC, HTMLAttributes, PropsWithChildren } from "react";
import { clsx } from "clsx";
import classes from "./Button.module.css";
import { ClassNameType } from "@/shared/types/types.ts";

type ButtonStyle = "circle";

type ButtonSizes = "sm" | "md";

type ButtonVariant = "primary" | "outline" | "danger" | "info" | "warning";

type ButtonProps = ClassNameType<{
	disabled?: boolean;
	variant?: ButtonVariant;
	buttonStyle?: ButtonStyle;
	buttonSizes?: ButtonSizes;
	type?: "submit" | "reset" | "button";
}> &
	HTMLAttributes<HTMLButtonElement>;

export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
	const {
		disabled,
		children,
		className,
		buttonStyle,
		buttonSizes = "md",
		variant = "primary",
		type = "button",
		...otherProps
	} = props;

	return (
		<button
			type={type}
			disabled={disabled}
			className={clsx(
				classes.button,
				classes[variant],
				classes[buttonSizes],
				buttonStyle && classes[buttonStyle],
				className,
			)}
			{...otherProps}
		>
			{children}
		</button>
	);
};
