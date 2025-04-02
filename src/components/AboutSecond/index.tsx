import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export default function AboutSecond() {
  const { mode } = useSelector((state: RootState) => state.theme);
  return <div>{mode}</div>;
}
