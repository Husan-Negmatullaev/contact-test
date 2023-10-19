import { FC, PropsWithChildren, useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const Portal: FC<PropsWithChildren> = (props) => {
	const { children } = props;
	const [container] = useState(() => document.createElement("div"));

	useEffect(() => {
		document.body.appendChild(container);

		return () => {
			document.body.removeChild(container);
		};
	}, [container]);

	return ReactDOM.createPortal(children, container);
};
