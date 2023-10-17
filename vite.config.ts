import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Unfonts from "unplugin-fonts/vite";

export default defineConfig({
	plugins: [
		react(),
		Unfonts({
			google: {
				families: [
					{
						name: "Nunito",
						styles: "wght@400;500;600;700",
					},
				],
			},
		}),
	],
	resolve: {
		alias: [
			{
				find: "@",
				replacement: path.resolve(__dirname, "src"),
			},
		],
	},
});
