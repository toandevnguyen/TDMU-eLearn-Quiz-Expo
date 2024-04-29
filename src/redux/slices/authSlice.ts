import { createSlice } from "@reduxjs/toolkit";

export interface authState {
  user: {
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  } | null;
  isLoggedIn: boolean;
}
const initialState: authState = {
  user: {
    email: null,
    displayName: null,
    photoURL: null,
  },
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {
        email: action.payload?.email,
        displayName: action.payload?.displayName,
        photoURL: action.payload?.photoURL,
      };
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = {
        email: null,
        displayName: null,
        photoURL: null,
      };
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export default authSlice.reducer;

// export interface authState {
//   user: any;
//   isLoggedIn: boolean;
// }

// const initialState: authState = {
//   user: null, // Thông tin người dùng sau khi đăng nhập
//   isLoggedIn: false, // Trạng thái đăng nhập
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       // state.isLoggedIn = true;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.isLoggedIn = false;
//     },
//   },
// });
