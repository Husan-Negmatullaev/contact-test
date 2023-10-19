import React from "react";
import App from "./app/App.tsx";
import ReactDOM from "react-dom/client";
import { StoreProvider } from "@/app/providers/StoreProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<StoreProvider>
			<App />
		</StoreProvider>
	</React.StrictMode>,
);
