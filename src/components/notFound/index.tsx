import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <span>404</span>
      <button onClick={() => navigate("/")}>go Home</button>
    </div>
  );
}
