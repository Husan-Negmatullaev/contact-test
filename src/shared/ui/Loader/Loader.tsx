import { FC } from "react";
import classes from "./Loader.module.css";
import { ClassNameType } from "@/shared/types/types.ts";
import { clsx } from "clsx";

type LoaderProps = ClassNameType<{
	align?: "center" | "left" | "right";
}>;

export const Loader: FC<LoaderProps> = (props) => {
	const { className, align = "left" } = props;

	return <div className={clsx(classes.loader, classes[align], className)} />;
};
