import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate("/videos");
    } else {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="auth-form">
      <h2>تسجيل الدخول</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>البريد الإلكتروني:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>كلمة المرور:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          تسجيل الدخول
        </button>
      </form>

      <p className="register-link">
        لا تملك حسابًا؟ <a href="/register">أنشئ حساب جديد</a>
      </p>
    </div>
  );
};

export default Login;
