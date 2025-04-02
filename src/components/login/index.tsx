import { useNavigate } from "react-router-dom";
import { login } from "../../api/login.ts";
import { useAuth } from "../../contexts/auth.tsx";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slice/user.ts";
import { Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.scss";
import { useState } from "react";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login: authLogin } = useAuth();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    let res = await login({ password, username });
    // token过期时间为1小时
    if (!res.code) {
      message.success("登录成功");
      const authToken: number = new Date().getTime() + 60 * 60 * 1000;
      localStorage.setItem("authToken", String(authToken));
      localStorage.setItem("accessToken", res.data.accessToken);
      dispatch(setUser({ userName: "admin", userId: 1, deptId: 115 }));
      authLogin();
      navigate("/");
    } else {
      message.error(res.msg);
    }
  }
  return (
    <div className="login">
      <div className="container">
        <div className="left">
          <img src={require("../../assets/login/p1.png")} alt="logo" />
          <span>智慧康复管理系统</span>
        </div>
        <div className="right">
          <span className="item title">登&nbsp;录</span>
          <Input
            value={username}
            className="item"
            size="large"
            placeholder="请输入用户名"
            onChange={(e) => setUserName(e.target.value)}
            prefix={<UserOutlined />}
          ></Input>
          {/*这里需要给handleLogin加上小括号，表示调用方法；如果不加小括号，此时只是函数的引用，并非调用函数，因为这只是将函数本身作为一个值，并未触发函数内部的代码逻辑*/}
          <Input.Password
            value={password}
            size="large"
            placeholder="请输入密码"
            className="item"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            prefix={<LockOutlined />}
          ></Input.Password>
          <div className="save-user">
            <Checkbox>保存用户</Checkbox>
          </div>
          <Button type="primary" className="item" onClick={handleLogin}>
            登&nbsp;&nbsp;&nbsp;&nbsp;录
          </Button>
        </div>
      </div>
    </div>
  );
}
