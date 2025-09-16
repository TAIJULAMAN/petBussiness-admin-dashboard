import { baseApi } from "../baseApi";

const businessOwnerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get all business owners with optional search/filter and pagination
        getAllBusinessOwners: builder.query({
            query: (params) => ({
                url: "dashboard/business-owners",
                method: "GET",
                params,
            }),
            providesTags: ["businessOwner"],
        }),

        // Block a business owner
        blockBusinessOwner: builder.mutation({
            query: (id) => ({
                url: `dashboard/business-owner/${id}/block`,
                method: "PUT",
            }),
            invalidatesTags: ["businessOwner"],
        }),

        // Unblock a business owner
        unblockBusinessOwner: builder.mutation({
            query: (id) => ({
                url: `dashboard/business-owner/${id}/unblock`,
                method: "PUT",
            }),
            invalidatesTags: ["businessOwner"],
        }),
    }),
});

export const {
    useGetAllBusinessOwnersQuery,
    useBlockBusinessOwnerMutation,
    useUnblockBusinessOwnerMutation,
} = businessOwnerApi;