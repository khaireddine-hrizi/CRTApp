import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "1rem",
        background: "#f8f8f8",
        display: "flex",
        gap: "1rem",
      }}
    >
      <Link to="/">🏠 الرئيسية</Link>
      <Link to="/about">ℹ️ حول الهلال</Link>
      <Link to="/principles">📜 المبادئ</Link>
      <Link to="/login">🔐 تسجيل الدخول</Link>
    </nav>
  );
}
