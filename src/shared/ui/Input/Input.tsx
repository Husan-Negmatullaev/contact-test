import {
	ChangeEvent,
	FC,
	HTMLAttributes,
	memo,
	Ref,
	useCallback,
	useId,
} from "react";
import { clsx } from "clsx";
import classes from "./Input.module.css";

type InputStyle = "bordered" | "circle";

type InputProps = Omit<HTMLAttributes<HTMLInputElement>, "onChange" | "id"> & {
	value?: string;
	disabled?: boolean;
	labelTitle?: string;
	variant?: InputStyle;
	type?: "text" | "password";
	rootRef?: Ref<HTMLInputElement>;
	onChange?: (value: string) => void;
};

export const Input: FC<InputProps> = memo((props) => {
	const {
		type = "text",
		value,
		rootRef,
		onChange,
		disabled = false,
		labelTitle,
		variant = "bordered",
		...otherProps
	} = props;
	const htmlForId = useId();

	const handleChangeValue = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			onChange?.(event.target.value);
		},
		[onChange],
	);

	return (
		<div>
			{labelTitle && (
				<label className={classes.label} htmlFor={htmlForId}>
					{labelTitle}
				</label>
			)}
			<input
				type={type}
				ref={rootRef}
				value={value}
				id={htmlForId}
				disabled={disabled}
				onChange={handleChangeValue}
				className={clsx(classes.input, classes[variant])}
				{...otherProps}
			/>
		</div>
	);
});
