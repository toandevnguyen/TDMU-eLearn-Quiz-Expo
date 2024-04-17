import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./slices/userInfoSlice";
// import { userSlice } from "./slices/userInfoSlice";

// ...

export const store = configureStore({
  reducer: {
    user: userInfoReducer,
    // user: userSlice,
    // user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
