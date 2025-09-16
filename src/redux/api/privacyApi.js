import { baseApi } from "./baseApi";

const privacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => ({
        url: "privacy/get",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),

    updatePrivacy: builder.mutation({
      query: ({ requestData }) => ({
        url: "setting/privacy_policys",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["privacy"],
    }),
  }),
});

export const { useGetPrivacyQuery, useUpdatePrivacyMutation } = privacyApi;
