import { ClassNameType } from "@/shared/types/types.ts";
import { FC } from "react";
import classes from "./ErrorPageLayout.module.css";
import { Container } from "@/shared/ui/Container/Container.tsx";
import { clsx } from "clsx";
import { Title } from "@/shared/ui/Title/Title.tsx";
import { AppRoute } from "@/shared/configs/routeConfig/appRouteConfigs.ts";
import { AppLink } from "@/shared/ui/AppLink/AppLink.tsx";

type ErrorPageLayoutProps = ClassNameType<{
	title?: string;
	linkText?: string;
	linkHref?: AppRoute;
	description?: string;
}>;

export const ErrorPageLayout: FC<ErrorPageLayoutProps> = (props) => {
	const {
		title,
		linkText,
		className,
		description,
		linkHref = AppRoute.home,
	} = props;

	return (
		<main className={clsx(classes.errorPage, className)}>
			<Container className={classes.errorPage__page}>
				<Title
					className={classes.errorPage__title}
					titleElemVariant="h1"
					align="center"
				>
					{title}
				</Title>
				<p className={classes.errorPage__description}>{description}</p>
				<AppLink className={classes.errorPage__link} to={linkHref}>
					{linkText}
				</AppLink>
			</Container>
		</main>
	);
};
