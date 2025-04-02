// 判断登录的token是否过期
const isTokenValid = () => {
  // 获取token过期时间
  const authToken = localStorage.getItem("authToken");
  // 如果没有则默认过期，返回false
  if (!authToken) return false;
  // 添加 10 秒缓冲期防止临界状态
  return Date.now() < parseInt(authToken, 10) - 10000;
};
export { isTokenValid };
