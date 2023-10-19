import { FC } from "react";
import { Container } from "@/shared/ui/Container/Container.tsx";
import { ChangeContact } from "@/features/ChangeContact";
import classes from "./ContactPage.module.css";
import { useParams } from "react-router-dom";

export const ContactPage: FC = () => {
	const params = useParams();

	return (
		<section className={classes.contact}>
			<Container min>
				<ChangeContact contactId={Number(params.id)} />
			</Container>
		</section>
	);
};
