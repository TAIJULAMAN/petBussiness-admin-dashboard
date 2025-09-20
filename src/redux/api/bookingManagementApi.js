import { baseApi } from "./baseApi";

export const bookingManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllbookingManagement: builder.query({
      query: () => ({
        url: "dashboard/services-stats",
        method: "GET",
      }),
      providesTags: ["bookingManagement"],
    }),
    
    getServiceBookings: builder.query({
      query: (arg) => {
        const serviceId = typeof arg === "string" ? arg : arg?.serviceId;
        const params = typeof arg === "object" ? arg?.params : undefined;
        return {
          url: `dashboard/service-bookings/${serviceId}`,
          method: "GET",
          params,
        };
      },
      providesTags: ["bookingManagement"],
    }),
  }),
});

export const { useGetAllbookingManagementQuery, useGetServiceBookingsQuery } = bookingManagementApi;
