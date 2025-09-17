import { baseApi } from "./baseApi";

const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSupport: builder.query({
      query: (params) => ({
        url: "help/get",
        method: "GET",
        params,
      }),
      providesTags: ["support"],
    }),
  }),
});

export const { useGetAllSupportQuery } = supportApi;

export default supportApi;
