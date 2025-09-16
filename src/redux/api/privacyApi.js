import { baseApi } from "./baseApi";

const privacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => ({
        url: "manage/get-privacy-policy",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),

    updatePrivacy: builder.mutation({
      query: ({ requestData }) => ({
        url: "manage/add-privacy-policy",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["privacy"],
    }),
  }),
});

export const { useGetPrivacyQuery, useUpdatePrivacyMutation } = privacyApi;
