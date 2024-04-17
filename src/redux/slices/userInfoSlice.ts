import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "firebase/auth";

import type { RootState } from "../store";

// Define a type for the slice state
export interface User {
  displayName?: string | null;
  email?: string | null;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  phoneNumber: string | null;
  photoURL?: string | null;
  providerData?: UserInfo[];
  providerId?: string;
  uid?: string;
}

// Define the initial state using that type
const initialState: User = {
  displayName: "",
  email: null,
  emailVerified: true,
  isAnonymous: true,
  phoneNumber: null,
  photoURL: null,
  providerData: [],
  providerId: "",
  uid: "",
};

export const userInfoSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getUserInfo: (sate) => {
      sate.displayName = "";
    },
  },
});

export const { getUserInfo } = userInfoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.user;

export default userInfoSlice.reducer;
