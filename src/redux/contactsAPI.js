import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { REHYDRATE } from 'redux-persist';

export const contactsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().currentUser.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Contacts', 'Users'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => ({
        url: `contacts`,
      }),
      providesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
      query(contactId) {
        return {
          url: `contacts/${contactId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Contacts'],
    }),
    addContact: builder.mutation({
      query: contact => ({
        url: `contacts`,
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),
    patchContact: builder.mutation({
      query({ contact, contactId }) {
        return {
          url: `contacts/${contactId}`,
          method: 'PATCH',
          body: contact,
        };
      },
      invalidatesTags: ['Contacts'],
    }),
    registerUser: builder.mutation({
      query(user) {
        return {
          url: `users/signup`,
          method: 'POST',
          body: user,
        };
      },
      invalidatesTags: ['Users'],
    }),
    authorizeUser: builder.mutation({
      query(user) {
        return {
          url: `users/login`,
          method: 'POST',
          body: user,
        };
      },
      invalidatesTags: ['Users'],
    }),
    logOutUser: builder.mutation({
      query() {
        return {
          url: `users/logout`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Users'],
    }),
    getUser: builder.query({
      query() {
        return {
          url: `users/current`,
        };
      },
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
  usePatchContactMutation,
  useAuthorizeUserMutation,
  useRegisterUserMutation,
  useLogOutUserMutation,
  useGetUserQuery,
} = contactsApi;
