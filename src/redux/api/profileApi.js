import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `auth/myprofile`,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),

    getAdminProfile: builder.query({
      query: () => ({
        url: "admin/get-profile",
        method: "GET",
      }),
      providesTags: ["profile"],
      keepUnusedDataFor: 0,
      refetchOnMountOrArgChange: true,
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "admin/update-profile",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["profile"],
    }),

    changeAdminPassword: builder.mutation({
      query: (data) => ({
        url: "admin/change-password",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetAdminProfileQuery,
  useUpdateProfileMutation,
  useChangeAdminPasswordMutation,
} = profileApi;
