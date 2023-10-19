import { FC } from "react";
import { clsx } from "clsx";
import CrossIcon from "@/shared/assets/icons/cross.svg?react";
import { ClassNameType } from "@/shared/types/types.ts";
import { Tag } from "../../model/types/types.ts";
import classes from "./TagItem.module.css";

export type TagProps = ClassNameType<{
	tag: Tag;
	onRemoveTag?: (tagId: number) => void;
}>;

export const TagItem: FC<TagProps> = (props) => {
	const { className, tag, onRemoveTag } = props;

	return (
		<div className={clsx(classes.tag, className)}>
			<h6 className={classes.tag__title}>{tag?.title}</h6>
			{onRemoveTag && (
				<button
					type="button"
					className={classes.tag__cross}
					onClick={() => onRemoveTag?.(tag.id)}
				>
					<CrossIcon />
				</button>
			)}
		</div>
	);
};
