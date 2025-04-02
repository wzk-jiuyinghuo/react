import { useSelector, useDispatch } from "react-redux";
// 引入导出的类型
import type { RootState } from "../../store";
import { setTheme } from "../../store/slice/theme.ts";
export default function AboutChild() {
  const dispatch = useDispatch();
  // 获取用户信息
  const { username, userid, deptId } = useSelector(
    (state: RootState) => state.user,
  );
  const { mode } = useSelector((state: RootState) => state.theme);
  function changeTheme() {
    dispatch(setTheme({ mode: "white" }));
  }
  return (
    <>
      <ul>
        <li>用户名{username}</li>
        <li>用户id{userid}</li>
        <li>科室id{deptId}</li>
        <li>主题{mode}</li>
      </ul>
      <button onClick={changeTheme}>修改主题</button>
    </>
  );
}
