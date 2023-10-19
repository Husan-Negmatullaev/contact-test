import { FC } from "react";
import { clsx } from "clsx";
import classes from "./ContactItem.module.css";
import { Contact } from "../../model/types/types.ts";
import { ClassNameType } from "@/shared/types/types.ts";
import { TagItem } from "../TagItem/TagItem.tsx";
import { AppRoute } from "@/shared/configs/routeConfig/appRouteConfigs.ts";
import { Link } from "react-router-dom";

type ContactProps = ClassNameType<{
	contact: Contact;
}>;

export const ContactItem: FC<ContactProps> = (props) => {
	const { className, contact } = props;

	return (
		<Link
			to={AppRoute.contact + "/" + contact.id}
			className={clsx(classes.contact, className)}
		>
			<div className={classes.contact__content}>
				<div className={classes.contact__info}>{contact.phone}</div>
				<div className={classes.contact__info}>
					{contact.surname} {contact.name} {contact.middleName}
				</div>
				<div className={classes.contact__info}>{contact.email}</div>
			</div>
			{!!contact.tags.length && (
				<div className={classes.contact__tags}>
					{contact.tags.map((tagItem) => (
						<TagItem tag={tagItem} />
					))}
				</div>
			)}
		</Link>
	);
};
