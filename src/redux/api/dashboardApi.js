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
    }),
  }),
});

export const { useGetAllDashboardQuery } = dashboardApi;

export default dashboardApi;
