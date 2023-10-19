import { ErrorPageLayout } from "@/widgets/ErrorPageLayout";

export const NotFoundPage = () => {
	return (
		<ErrorPageLayout
			title="Страница не найдена 404"
			description="Такой страницы нету"
			linkText="На главную"
		/>
	);
};
