import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import Unfonts from "unplugin-fonts/vite";

export default defineConfig({
	plugins: [
		svgr({
			svgrOptions: {
				plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
				svgoConfig: {
					plugins: [
						"removeTitle",
						"removeDesc",
						"cleanupIds",
						"removeDoctype",
						"preset-default",
					],
				},
			},
		}),
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
