import { FC } from "react";
import classes from "./HomePage.module.css";
import { Container } from "@/shared/ui/Container/Container.tsx";
import { ListContactsWithSearchInput } from "@/widgets/ListContactsWithSearchInput";

export const HomePage: FC = () => {
	return (
		<section className={classes.home}>
			<Container min>
				<ListContactsWithSearchInput />
			</Container>
		</section>
	);
};
