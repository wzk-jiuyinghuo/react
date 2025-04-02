import { createSlice } from "@reduxjs/toolkit";
// 创建一个用户slice
const userSlice = createSlice({
  // 切片名称
  name: "user",
  // 初始值
  initialState: {
    username: "123",
    userid: 0,
    deptId: 0,
  },
  reducers: {
    // 定义修改state中的方法
    setUser: (state, action) => {
      state.username = action.payload.userName;
      state.userid = action.payload.userId;
      state.deptId = action.payload.deptId;
    },
  },
});

export { userSlice };
// 到出切片的方法
export const { setUser } = userSlice.actions;
