import { FC, useState } from "react";
import { clsx } from "clsx";
import classes from "./HomePage.module.css";
import { ClassNameType } from "@/shared/types/types.ts";
import { Container } from "@/shared/ui/Container/Container.tsx";
import { ListContacts, useGetAllContactsQuery } from "@/entities/Contact";
import { AddContactModal } from "../../../../features/AddContactModal";
import { useSelector } from "react-redux";
import { userSelector } from "@/entities/User";
import { Title } from "@/shared/ui/Title/Title.tsx";

export const HomePage: FC<ClassNameType> = (props) => {
	const { className } = props;
	const user = useSelector(userSelector);
	const [isOpenModalAddContact, setIsOpenModalContact] = useState(false);
	const { data, isFetching, isLoading, refetch } = useGetAllContactsQuery(
		{
			userId: user?.id,
		},
		{
			refetchOnMountOrArgChange: true,
		},
	);

	return (
		<section className={clsx(classes.home, className)}>
			<Container min>
				<AddContactModal
					opened={isOpenModalAddContact}
					onClose={() => setIsOpenModalContact(false)}
				/>
				<div className={classes.home__body}>
					{user?.id ? (
						<ListContacts
							contacts={data}
							isLoading={isFetching}
							isFirstLoading={isLoading}
							updateListContacts={refetch}
							openAddContact={() => setIsOpenModalContact(true)}
						/>
					) : (
						<Title titleElemVariant="h1" align="center">
							Пожалуйста зарегистрируйтесь или войдите в систему!
						</Title>
					)}
				</div>
			</Container>
		</section>
	);
};
