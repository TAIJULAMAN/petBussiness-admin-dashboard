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

    // createUser: builder.mutation({
    //   query: (data) => ({
    //     url: "user/create_user",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["User"],
    // }),

    // getMyProfile: builder.query({
    //   query: (token) => ({
    //     url: "auth/myprofile",
    //     method: "GET",
    //     headers: { Authorization: token },
    //   }),
    //   providesTags: ["auth"],
    // }),

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

    // verifyEmail: builder.mutation({
    //   query: (data) => ({
    //     url: "user/verification_forgot_user",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

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

    // userVarification: builder.mutation({
    //   query: (data) => ({
    //     url: "user/user_verification",
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["User"],
    // }),
  }),
});

export const {
  useLogInMutation,
  // useCreateUserMutation,
  useForgotPasswordMutation,
  useVerifyCodeMutation,
  // useVerifyEmailMutation,
  useResetPasswordMutation,
  // useGetMyProfileQuery,
  // useUserVarificationMutation,
} = authApi;

export default authApi;
