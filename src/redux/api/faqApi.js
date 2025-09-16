import { baseApi } from "./baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all FAQs with optional search/filter
    getAllFaq: builder.query({
      query: (params) => ({
        url: "faq/get",
        method: "GET",
        params,
      }),
      providesTags: ["faq"],
    }),


    // Create new FAQ
    createFaq: builder.mutation({
      query: (data) => ({
        url: "faq/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),

    // Update existing FAQ
    updateFaq: builder.mutation({
      query: ({ id, ...data }) => {
        const token = localStorage.getItem("accessToken");
        return {
          url: `faq/update/${id}`,
          method: "PUT",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["faq"],
    }),

    // Delete FAQ
    deleteFaq: builder.mutation({
      query: (id) => {
        const token = localStorage.getItem("accessToken");
        return {
          url: `faq/delete/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["faq"],
    }),
  }),
});

export const {
  useGetAllFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;

export default faqApi;