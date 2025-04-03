import "./header.scss";
import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
interface MenuItemList {
  name: string;
  icon: React.ReactNode;
  id: number;
}
const menuList: MenuItemList[] = [
  { name: "医生工作站", icon: <HomeOutlined />, id: 1 },
  { name: "评估工作站", icon: <HomeOutlined />, id: 2 },
  { name: "治疗工作站", icon: <HomeOutlined />, id: 3 },
  { name: "团队会议", icon: <HomeOutlined />, id: 4 },
  { name: "文书工作战", icon: <HomeOutlined />, id: 5 },
  { name: "指控工作站", icon: <HomeOutlined />, id: 6 },
  { name: "信息管理", icon: <HomeOutlined />, id: 7 },
  { name: "设备管理", icon: <HomeOutlined />, id: 8 },
  { name: "系统配置", icon: <HomeOutlined />, id: 9 },
  { name: "系统管理", icon: <HomeOutlined />, id: 10 },
  { name: "基础设施", icon: <HomeOutlined />, id: 11 },
];
export default function LayoutMyHeader() {
  const [activeMenu, setActiveMenu] = useState<number>(1);

  // 展示的菜单
  const [showMenuList, setShowMenuList] = useState<MenuItemList[]>([]);
  function handleMenu(id: number) {
    setActiveMenu(id);
  }
  // 允许放的个数
  let [allowMenuCount, setAllowMenuCount] = useState<number>(0);
  useEffect(() => {
    const handleResize = () => {
      // 获取屏幕宽度
      let width: number = window.innerWidth;
      // 中间菜单可用的宽度
      let availableWidth: number = width - 2 * 50 - 300 - 300;

      // 单个菜单的宽度  150+2*10
      let menuWidth: number = 170;
      // 允许放的个数
      setAllowMenuCount(Math.floor(availableWidth / menuWidth));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    // 新增一个菜单项
    const newMenuItem: MenuItemList = {
      name: "更多菜单",
      icon: <AppstoreOutlined />,
      id: menuList.length + 1,
    };
    // 计算最大可显示的基础菜单项数量
    const maxBaseMenus = Math.max(0, allowMenuCount - 1);
    let newShowMenuList =
      allowMenuCount >= menuList.length
        ? [...menuList]
        : [...menuList.slice(0, maxBaseMenus), newMenuItem];

    setShowMenuList(newShowMenuList);
  }, [allowMenuCount]);

  const menus = showMenuList.map((item: any) => {
    return (
      <div
        className={activeMenu === item.id ? "menu-item active" : "menu-item"}
        key={item.id}
        onClick={() => handleMenu(item.id)}
      >
        {item.icon}
        {item.name}
      </div>
    );
  });
  return (
    <>
      <div className="header-container">
        <div className="header-logo">
          <HomeOutlined style={{ fontSize: "20px" }}></HomeOutlined>
        </div>
        <div className="header-title">智慧康复管理系统V4.0</div>
        <div className="header-menu">{menus}</div>
        <div className="header-setting">这是操作</div>
      </div>
    </>
  );
}
