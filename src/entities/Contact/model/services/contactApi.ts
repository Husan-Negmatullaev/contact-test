import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "@/shared/configs/axios/axios.ts";
import { Contact } from "@/entities/Contact";
import {
	GetAllContactsQueryArgs,
	GetContactByIdQueryArgs,
} from "../types/types.ts";
export const contactApi = createApi({
	reducerPath: "contactApi",
	baseQuery: fetchBaseQuery({
		baseUrl: baseURL,
	}),
	tagTypes: ["Contacts"],
	endpoints: (builder) => ({
		getAllContacts: builder.query<Contact[], GetAllContactsQueryArgs>({
			query: ({ userId, searchQuery }: GetAllContactsQueryArgs) => ({
				url: "/contacts",
				params: {
					userId,
					q: searchQuery,
				},
			}),
			transformResponse: (baseQueryReturnValue: Contact[], _, arg) => {
				return baseQueryReturnValue.filter(
					(contact) => contact.userId === arg.userId,
				);
			},
			providesTags: (result) =>
				!result
					? ["Contacts"]
					: [
							...result.map(({ id }) => ({ type: "Contacts", id }) as const),
							{ type: "Contacts", id: "LIST" },
					  ],
		}),
		getContactById: builder.query<Contact, GetContactByIdQueryArgs>({
			query: (args) => ({
				url: `/contacts/${args.contactId}`,
				method: "GET",
			}),
			providesTags: (_, __, arg) => [{ type: "Contacts", id: arg.contactId }],
		}),
		addContact: builder.mutation<Contact, Omit<Contact, "id">>({
			query: (contact) => ({
				url: "/contacts",
				method: "POST",
				body: contact,
			}),
			invalidatesTags: [{ type: "Contacts", id: "LIST" }],
		}),
		updateContact: builder.mutation<Contact, Contact>({
			query: (contact: Contact) => ({
				url: `/contacts/${contact.id}`,
				method: "PATCH",
				body: contact,
			}),
			invalidatesTags: (_, __, { id }) => [{ type: "Contacts", id }],
		}),
		deleteContact: builder.mutation<void, number>({
			query: (id) => ({
				url: `/contacts/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (_, __, id) => [{ type: "Contacts", id }],
		}),
	}),
});

export const {
	useAddContactMutation,
	useGetAllContactsQuery,
	useGetContactByIdQuery,
	useUpdateContactMutation,
	useDeleteContactMutation,
} = contactApi;
