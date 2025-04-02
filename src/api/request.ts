import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// 定义响应类型
interface ApiResponse<T = any> {
  code: number;
  msg: string;
  data: T;
}
// 创建axios实例
const service = axios.create({
  baseURL: "/admin-api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});
// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 在此增加Token等
    const token: string = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);
//响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response.data;
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);
// 封装通用请求方法
export async function request(
  config: AxiosRequestConfig,
): Promise<ApiResponse> {
  try {
    return await service(config);
  } catch (err) {
    console.log(err);

    return await Promise.reject(err);
  }
}
// 封装GET POST方法
export const get = (url: string, params?) => {
  return request({ method: "get", url, params });
};
export const post = (url: string, data?) => {
  return request({ method: "post", url, data });
};
