import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// 引入 slice 模块
import { themeSlice } from "./slice/theme";
import { userSlice } from "./slice/user";
import { routeSlice } from "./slice/route";

// 类型修复关键点：显式定义 RootReducer 类型
type RootReducer = ReturnType<typeof rootReducer>;

// 合并所有 reducer
const rootReducer = combineReducers({
  theme: themeSlice.reducer,
  user: userSlice.reducer,
  route: routeSlice.reducer,
});

// 持久化配置
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

// 创建持久化 reducer（显式类型声明）
const persistedReducer = persistReducer<RootReducer>(
  persistConfig,
  rootReducer,
);

// 创建 Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 创建持久化 store 实例
export const persistor = persistStore(store);

// 导出类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
