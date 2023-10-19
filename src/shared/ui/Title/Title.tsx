import { createElement, FC, HTMLAttributes, PropsWithChildren } from "react";
import { clsx } from "clsx";
import classes from "./Title.module.css";

type TitleProps = {
	titleElemVariant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	align?: "center" | "left" | "right";
} & HTMLAttributes<HTMLTitleElement>;

export const Title: FC<PropsWithChildren<TitleProps>> = (props) => {
	const {
		children,
		className,
		titleElemVariant = "h1",
		align = "left",
		...otherProps
	} = props;

	return createElement(
		titleElemVariant,
		{
			className: clsx(
				classes.title,
				classes[align],
				classes[titleElemVariant],
				className,
			),
			...otherProps,
		},
		children,
	);
};
