import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      // console.log("token", token);
    },
    // logout: (state) => {
    //   state.user = null;
    //   state.token = null;
    // },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   accessToken: null,
//   refreshToken: null,
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       // console.log("authslice");

//       const { user, accessToken, refreshToken } = action.payload;

//       state.user = user;
//       state.accessToken = accessToken;
//       state.refreshToken = refreshToken;
//       // console.log("accessToken", accessToken);
//     },
//     logout: (state) => {
//       state.user = null;
//       state.accessToken = null;
//       state.refreshToken = null;
//     },
//   },
// });

// export const { setUser, logout } = authSlice.actions;

// export default authSlice.reducer;
