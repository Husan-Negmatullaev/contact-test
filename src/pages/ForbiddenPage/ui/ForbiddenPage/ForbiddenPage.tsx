import classes from "./ForbiddenPage.module.css";
import { ErrorPageLayout } from "@/widgets/ErrorPageLayout";

export const ForbiddenPage = () => {
	return (
		<ErrorPageLayout
			linkText="На главную"
			title="Нет доступа 403"
			className={classes.forbidden}
			description="У вас нету доступа к это странице"
		/>
	);
};
