// store.js
import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
  name: "routes",
  initialState: {
    routes: [],
  },
  reducers: {
    setRoutes: (state, action) => {
      state.routes = action.payload;
    },
  },
});
export { routeSlice };
export const { setRoutes } = routeSlice.actions;
