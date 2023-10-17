import { FC } from "react";
import { clsx } from "clsx";
import { ClassNameType } from "@/shared/types/types.ts";
import classes from "./Header.module.css";
import PhoneIcon from "/phone.svg";
import { Container } from "@/shared/ui/Container/Container.tsx";
import { Link } from "react-router-dom";
import { AppRoute } from "@/shared/configs/appRouteConfigs.ts";
import { Button } from "@/shared/ui/Button/Button.tsx";

export const Header: FC<ClassNameType> = (props) => {
	const { classNames } = props;

	// const activeLinkClassName = ({ isActive }: ClassNameProps): string => {
	// 	return clsx(
	// 		classes.headerNav__link,
	// 		isActive && classes.headerNav__link_active,
	// 	);
	// };

	return (
		<header className={clsx(classes.header, classNames)}>
			<Container>
				<div className={classes.headerBody}>
					<Link className={classes.header__logo} to={AppRoute.home}>
						<img src={PhoneIcon} alt={"Phone number icon"} />
					</Link>
					<nav className={clsx(classes.headerBody__nav, classes.headerNav)}>
						<ul className={classes.headerNav__list}>
							{/*<li className={classes.headerNav__item}>*/}
							{/*	<NavLink className={activeLinkClassName} to={AppRoute.contact}>*/}
							{/*		Контакты*/}
							{/*	</NavLink>*/}
							{/*</li>*/}
							<li className={classes.headerNav__item}>
								<Button>Вход</Button>
							</li>
						</ul>
					</nav>
				</div>
			</Container>
		</header>
	);
};
