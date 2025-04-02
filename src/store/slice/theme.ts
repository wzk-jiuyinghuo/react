import { createSlice } from "@reduxjs/toolkit";
// 创建一个主题slice
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: "dark",
  },
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload.mode;
    },
  },
});
export { themeSlice };
export const { setTheme } = themeSlice.actions;
