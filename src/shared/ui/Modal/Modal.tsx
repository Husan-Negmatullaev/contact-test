import {
	FC,
	memo,
	PropsWithChildren,
	useEffect,
	useRef,
	useState,
} from "react";
import classes from "./Modal.module.css";
import animationCLasses from "./ModalAnimation.module.css";
import { Portal } from "@/shared/ui/Portal/Portal.tsx";
import { useMount } from "@/shared/hooks/useMount.ts";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";

type ModalProps = {
	opened?: boolean;
	onClose?: () => void;
};

const ANIMATION_TIME = 300;

export const Modal: FC<PropsWithChildren<ModalProps>> = memo((props) => {
	const { opened, onClose, children } = props;
	const { mounted } = useMount({
		opened,
		mountedInterval: ANIMATION_TIME,
	});

	useEffect(() => {
		const keyDownHandler = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault();
				onClose?.();
			}
		};

		document.addEventListener("keydown", keyDownHandler);

		return () => {
			document.removeEventListener("keydown", keyDownHandler);
		};
	}, [onClose]);

	if (!mounted) {
		return null;
	}

	return (
		<Portal>
			<ModalLayout opened={opened} onClose={onClose}>
				{children}
			</ModalLayout>
		</Portal>
	);
});

const overlayAnimationClasses: CSSTransitionClassNames = {
	enter: animationCLasses.overlay_enter,
	enterActive: animationCLasses.overlay_enterActive,
	exit: animationCLasses.overlay_exit,
	exitActive: animationCLasses.overlay_exitActive,
};

const contentAnimationClasses: CSSTransitionClassNames = {
	enter: animationCLasses.content_enter,
	enterActive: animationCLasses.content_enterActive,
	exit: animationCLasses.content_exit,
	exitActive: animationCLasses.content_exitActive,
};

export const ModalLayout: FC<PropsWithChildren<ModalProps>> = (props) => {
	const { children, opened, onClose } = props;
	const overlayRef = useRef(null);
	const contentRef = useRef(null);

	const [animationIn, setAnimationIn] = useState(false);

	useEffect(() => {
		setAnimationIn(Boolean(opened));
	}, [opened]);

	useEffect(() => {
		const keyDownHandler = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault();
				onClose?.();
			}
		};

		document.addEventListener("keydown", keyDownHandler);

		return () => document.removeEventListener("keydown", keyDownHandler);
	}, [onClose]);

	return (
		<div className={classes.modal}>
			<CSSTransition
				mountOnEnter
				unmountOnExit
				in={animationIn}
				nodeRef={overlayRef}
				timeout={ANIMATION_TIME}
				classNames={overlayAnimationClasses}
			>
				<div
					role="button"
					ref={overlayRef}
					onClick={onClose}
					className={classes.modal__overlay}
				/>
			</CSSTransition>
			<CSSTransition
				mountOnEnter
				unmountOnExit
				in={animationIn}
				nodeRef={contentRef}
				timeout={ANIMATION_TIME}
				classNames={contentAnimationClasses}
			>
				<div ref={contentRef} className={classes.modal__content}>
					{children}
				</div>
			</CSSTransition>
		</div>
	);
};
