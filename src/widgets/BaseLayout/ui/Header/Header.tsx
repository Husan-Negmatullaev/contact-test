import { FC, useState } from "react";
import { clsx } from "clsx";
import { ClassNameType } from "@/shared/types/types.ts";
import classes from "./Header.module.css";
import PhoneIcon from "/phone.svg";
import { Container } from "@/shared/ui/Container/Container.tsx";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/Button/Button.tsx";
import { SignInModal } from "@/features/SignInModal";
import { SignOnModal } from "@/features/SignOnModal";
import { AppRoute } from "@/shared/configs/routeConfig/appRouteConfigs.ts";
import { useSelector } from "react-redux";
import { LogOutButton, userSelector } from "@/entities/User";
import { Title } from "@/shared/ui/Title/Title.tsx";

export const Header: FC<ClassNameType> = (props) => {
	const { className } = props;
	const user = useSelector(userSelector);
	const [isOpenSignInModal, setIsOpenSignInModal] = useState(false);
	const [isOpenSignOnModal, setIsOpenSignOnModal] = useState(false);

	return (
		<header className={clsx(classes.header, className)}>
			<Container>
				<div className={classes.headerBody}>
					<Link className={classes.header__logo} to={AppRoute.home}>
						<img src={PhoneIcon} alt={"Phone number icon"} />
					</Link>
					<nav className={clsx(classes.headerBody__nav, classes.headerNav)}>
						<ul className={classes.headerNav__list}>
							{!user && (
								<>
									<li className={classes.headerNav__item}>
										<Button onClick={() => setIsOpenSignInModal(true)}>
											Регистрация
										</Button>
										<SignOnModal
											opened={isOpenSignInModal}
											onClose={() => setIsOpenSignInModal(false)}
										/>
									</li>
									<li className={classes.headerNav__item}>
										<Button variant="outline" onClick={() => setIsOpenSignOnModal(true)}>
											Вход
										</Button>
										<SignInModal
											opened={isOpenSignOnModal}
											onClose={() => setIsOpenSignOnModal(false)}
										/>
									</li>
								</>
							)}
							{!!user && (
								<li
									className={clsx(
										classes.headerNav__item,
										classes.headerNav__item_userName,
									)}
								>
									<Title titleElemVariant="h5">{user.name}</Title>
									<LogOutButton />
								</li>
							)}
						</ul>
					</nav>
				</div>
			</Container>
		</header>
	);
};
