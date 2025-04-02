// src/contexts/auth.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { isTokenValid } from "../utils";
// 定义认证上下文类型
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}
// 创建一个上下文对象。初始值为null
const AuthContext = createContext<AuthContextType | null>(null);
// 创建认证状态提供者组件
export function AuthProvider({ children }: { children: ReactNode }) {
  // 根据工具函数isTokenValid获取初始值
  const [isAuthenticated, setIsAuthenticated] = useState(isTokenValid());

  // 监听 localStorage 变化
  useEffect(() => {
    // 当localStorage变化时，监听storage事件，调用setIsAuthenticated更新认证状态，确保跨标签页面状态同步
    const handleStorageChange = () => {
      setIsAuthenticated(isTokenValid());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth必须在AuthProvider内使用");
  return context;
}
