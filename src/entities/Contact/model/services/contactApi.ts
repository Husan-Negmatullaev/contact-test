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
				result ? result.map(({ id }) => ({ type: "Contacts", id })) : ["Contacts"],
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
			invalidatesTags: ["Contacts"],
		}),
		updateContact: builder.mutation<Contact, Contact>({
			query: (contact: Contact) => ({
				url: `/contacts/${contact.id}`,
				method: "PATCH",
				body: contact,
			}),
			invalidatesTags: (result) =>
				result ? [{ type: "Contacts", id: result.id }] : ["Contacts"],
		}),
		deleteContact: builder.mutation<void, Contact>({
			query: ({ id }) => ({
				url: `/contacts/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Contacts"],
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
