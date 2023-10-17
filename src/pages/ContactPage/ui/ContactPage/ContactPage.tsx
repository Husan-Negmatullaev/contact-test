import { FC } from "react";
import { clsx } from "clsx";
import { ClassNameType } from "@/shared/types/types.ts";
import { Container } from "@/shared/ui/Container/Container.tsx";

export const ContactPage: FC<ClassNameType> = (props) => {
	const { classNames } = props;

	return (
		<section className={clsx(classNames)}>
			<Container>Contacts Page</Container>
		</section>
	);
};
