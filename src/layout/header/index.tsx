import "./header.scss";
import {
  HomeOutlined,
  AppstoreOutlined,
  InfoCircleFilled,
  BellFilled,
  UserOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Badge, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { persistor } from "../../store";
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
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<number>(1);
  const { username } = useSelector((state: RootState) => state.user);
  // 展示的菜单
  const [showMenuList, setShowMenuList] = useState<MenuItemList[]>([]);
  // 剩余的菜单
  const [remainingMenuList, setRemainingMenuList] = useState<MenuItemList[]>(
    [],
  );

  function handleMenu(id: number) {
    setActiveMenu(id);
  }
  function handleRemainMenu(event) {
    // 组织冒泡事件
    event.stopPropagation();
    // 跳转后关闭下拉菜单
    setActiveMenu(999);
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
      id: 999,
    };
    // 计算最大可显示的基础菜单项数量
    const maxBaseMenus = Math.max(0, allowMenuCount - 1);
    let newShowMenuList =
      allowMenuCount >= menuList.length
        ? [...menuList]
        : [...menuList.slice(0, maxBaseMenus), newMenuItem];
    let newRemainingMenuList =
      allowMenuCount >= menuList.length
        ? []
        : [...menuList.slice(maxBaseMenus)];
    setShowMenuList(newShowMenuList);
    setRemainingMenuList(newRemainingMenuList);
  }, [allowMenuCount]);
  const remainingMenus = remainingMenuList.map((item) => {
    return (
      <div
        className="menu-item-remaining"
        onClick={handleRemainMenu}
        key={item.id}
      >
        {item.icon}
        {item.name}
      </div>
    );
  });
  const menus = showMenuList.map((item: any) => {
    const isMoreMenu = item.name === "更多菜单";
    return (
      <>
        <div
          className={`menu-item ${activeMenu === item.id ? "active" : ""} ${
            isMoreMenu ? "menu-item-more" : ""
          }`}
          key={item.id}
          onClick={() => handleMenu(item.id)}
        >
          {item.icon}
          {item.name}
          {/* 仅更多菜单显示下拉容器 */}
          {isMoreMenu && <div className="remaining-menu">{remainingMenus}</div>}
        </div>
      </>
    );
  });
  const { confirm } = Modal;
  async function handleLogout() {
    confirm({
      title: "是否退出系统？",
      icon: <ExclamationCircleFilled />,
      okText: "退出",
      cancelText: "取消",
      async onOk() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("authToken");
        navigate("/login");
        // 清除持久化
        await persistor.purge();
      },
    });
  }
  return (
    <>
      <div className="header-container">
        <div className="header-logo">
          <HomeOutlined style={{ fontSize: "20px" }}></HomeOutlined>
        </div>
        <div className="header-title">智慧康复管理系统V4.0</div>
        <div className="header-menu">{menus}</div>
        <div className="header-setting">
          <InfoCircleFilled style={{ fontSize: "18px" }} />

          <div className="icon">
            <Badge count={5} size="small">
              <BellFilled style={{ fontSize: "18px" }} />
            </Badge>
          </div>

          <div className="user-name" onClick={handleLogout}>
            <UserOutlined style={{ fontSize: "18px" }} />
            <span className="name">{username}</span>
          </div>
        </div>
      </div>
    </>
  );
}
