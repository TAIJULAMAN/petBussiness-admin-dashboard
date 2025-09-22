import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => {
        return {
          url: "auth/login",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyCode: builder.mutation({
      query: (data) => ({
        url: "auth/verify-code",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("accessToken");
        return {
          url: "auth/reset-password",
          method: "POST",
          body: data,
          headers: {
            Authorization: `${token}`,
          },
        };
      },
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLogInMutation,
  useForgotPasswordMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
} = authApi;

export default authApi;
