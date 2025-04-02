import { post } from "./request.ts";
export const login = (data) => post("/system/auth/login", data);
