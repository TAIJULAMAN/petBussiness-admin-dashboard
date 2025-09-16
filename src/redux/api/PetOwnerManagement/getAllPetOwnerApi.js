import { baseApi } from "../baseApi";


const petOwnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all pet owners with optional search/filter and pagination
    getAllPetOwners: builder.query({
      query: (params) => ({
        url: "dashboard/pet-owners",
        method: "GET",
        params,
      }),
      providesTags: ["petOwner"],
    }),

    // Block a pet owner
    blockPetOwner: builder.mutation({
      query: ({ id, body }) => ({
        url: `dashboard/pet-owner/${id}/block`,
        method: "PUT",
         body,
      }),
      invalidatesTags: ["petOwner"],
    }),

    // Unblock a pet owner
    unblockPetOwner: builder.mutation({
      query: ({ id, body }) => ({
        url: `dashboard/pet-owner/${id}/unblock`,
        method: "PUT",
         body,
      }),
      invalidatesTags: ["petOwner"],
    }),
  }),
});

export const {
  useGetAllPetOwnersQuery,
  useBlockPetOwnerMutation,
  useUnblockPetOwnerMutation,
} = petOwnerApi;