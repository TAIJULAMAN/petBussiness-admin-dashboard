import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDashboard: builder.query({
      query: (params) => ({
        url: "dashboard/stats",
        method: "GET",
        params,
      }),
      providesTags: ["dashboard"],
      // Add caching and performance optimizations
      keepUnusedDataFor: 300, // Keep data for 5 minutes
      transformResponse: (response) => {
        // Pre-process data to reduce client-side computation
        if (response?.data?.sellerGrowth?.monthlyData) {
          response.data.sellerGrowth.monthlyData = response.data.sellerGrowth.monthlyData.map(item => ({
            ...item,
            cumulative: item.cumulative || 0,
            count: item.count || 0
          }));
        }
        return response;
      },
    }),
  }),
});

export const { useGetAllDashboardQuery } = dashboardApi;

export default dashboardApi;
