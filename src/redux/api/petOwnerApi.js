import { baseApi } from "./baseApi";

const petOwnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPetOwners: builder.query({
      query: (params) => ({
        url: "dashboard/pet-owners",
        method: "GET",
        params,
      }),
      providesTags: ["petOwners"],
    }),
  }),
});

export const { useGetAllPetOwnersQuery } = petOwnerApi;

export default petOwnerApi;
