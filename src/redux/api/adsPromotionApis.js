import { baseApi } from "./baseApi";

export const adsPromotionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Get all advertisements
    getAllAds: builder.query({
      query: (params) => ({
        url: "advertisement/get-all-ads",
        method: "GET",
        params, // optional query params if needed
      }),
    }),

    // Update advertisement status
    updateAdsStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `advertisement/update-ads-status/${id}`,
        method: "PUT",
        body: { status }, // 'ACTIVE' | 'INACTIVE'
      }),
    }),


  }),
});

export const {

  useGetAllAdsQuery,
  useUpdateAdsStatusMutation,

} = adsPromotionApi;
