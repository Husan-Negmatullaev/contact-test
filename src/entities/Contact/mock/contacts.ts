import { Contact } from "../model/types/types.ts";

export const contacts: Contact[] = [
	{
		id: 1,
		name: "Husan",
		surname: "Negmatullaev",
		middleName: "Ahmadovich",
		email: "husan@gmail.com",
		phone: "+998 (99) 999-99-99",
		tags: [
			{
				id: 0,
				title: "me",
			},
			{
				id: 1,
				title: "family",
			},
		],
	},
	{
		id: 2,
		name: "Daler",
		surname: "Dalerovich",
		middleName: "Daler",
		email: "daler@gmail.com",
		phone: "+998 (98) 998-98-98",
		tags: [
			{
				id: 1,
				title: "family",
			},
		],
	},
];
