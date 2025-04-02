import { Outlet, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import "./index.scss";
import { useEffect } from "react";
const { Header, Sider, Content } = Layout;
export default function Home() {
  const navigate = useNavigate();
  /**
   * useEffect：
   *  用来处理组件中的“副作用”，副作用包括：获取数据、修改网页标题、监听事件、定时器这些“额外操作”
   *  接收两个参数，第一个为函数，第二个为依赖组
   *    依赖组：
   *      ·不写依赖组：组件每次渲染都执行
   *      ·依赖组为[]：只在第一次执行
   *      ·[依赖项]：依赖项变化是执行
   *   eg:
   *   useEffect(() => {
   *     let timer = setTimeout(() => {
   *       console.log("hi");
   *     }, 1000);
   *     return () => clearTimeout(timer); //卸载组件清楚定时器
   *   });
   *   为什么需要它：
   *     ·让UI和副作用分开，保持组件专注于渲染
   *     ·避免内存泄漏，比如关掉定时器
   *     ·控制执行时机，用依赖组控制如何触发
   */

  useEffect(() => {
    navigate("/doctorWorkstations/patient");
  }, [navigate]);
  useEffect(() => {
    const handleResize = (e) => {
      console.log("窗口大小变了！", e.target.innerWidth, e.target.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authToken");
    navigate("/login");
  }
  return (
    <div>
      <Layout className="app-container">
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
