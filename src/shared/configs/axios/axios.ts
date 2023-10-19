import axios from "axios";

export const baseURL: string = import.meta.env.VITE_API_URL;

export const $api = axios.create({
	baseURL,
});
