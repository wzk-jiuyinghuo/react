import { configureStore } from "@reduxjs/toolkit";
// 引入slice模块
import { themeSlice } from "./slice/theme.ts";
import { userSlice } from "./slice/user.ts";
import { routeSlice } from "./slice/route.ts";
// 创建store
export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    user: userSlice.reducer,
    route: routeSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
