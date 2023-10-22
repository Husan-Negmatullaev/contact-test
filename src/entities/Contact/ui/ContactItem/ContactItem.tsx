import { FC } from "react";
import { clsx } from "clsx";
import classes from "./ContactItem.module.css";
import { Contact } from "../../model/types/types.ts";
import { ClassNameType } from "@/shared/types/types.ts";
import { TagItem } from "../TagItem/TagItem.tsx";
import EditIcon from "@/shared/assets/icons/edit.svg?react";
import TrashIcon from "@/shared/assets/icons/trash.svg?react";
import { Button } from "@/shared/ui/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "@/shared/configs/routeConfig/appRouteConfigs.ts";

type ContactProps = ClassNameType<{
	contact: Contact;
	deleteContact?: (id: number) => void;
}>;

export const ContactItem: FC<ContactProps> = (props) => {
	const { className, contact, deleteContact } = props;
	const navigate = useNavigate();

	const handleNavigateContact = () => {
		navigate(AppRoute.contact + "/" + contact.id);
	};

	return (
		<div
			// to={AppRoute.contact + "/" + contact.id}
			className={clsx(classes.contact, className)}
		>
			<div className={classes.contact__content}>
				<div className={classes.contact__info}>{contact.phone}</div>
				<div className={classes.contact__info}>
					{contact.surname} {contact.name} {contact.middleName}
				</div>
				<div className={classes.contact__info}>{contact.email}</div>
				<div className={classes.contact__actions}>
					<Button
						buttonSizes="sm"
						variant="warning"
						buttonStyle="circle"
						onClick={handleNavigateContact}
						className={classes.contact__action}
					>
						<EditIcon />
					</Button>
					<Button
						buttonSizes="sm"
						variant="danger"
						buttonStyle="circle"
						className={classes.contact__action}
						onClick={() => deleteContact?.(contact.id)}
					>
						<TrashIcon />
					</Button>
				</div>
			</div>
			{!!contact.tags.length && (
				<div className={classes.contact__tags}>
					{contact.tags.map((tagItem) => (
						<TagItem tag={tagItem} />
					))}
				</div>
			)}
		</div>
	);
};
