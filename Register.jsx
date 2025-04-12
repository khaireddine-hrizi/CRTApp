import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "free", // 'free' أو 'paid'
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("الرجاء ملء جميع الحقول");
      return;
    }

    // هنا يجب إرسال البيانات للخادم
    console.log("بيانات التسجيل:", formData);

    if (formData.userType === "paid") {
      navigate("/payment");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="auth-form">
      <h2>إنشاء حساب جديد</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>الاسم الكامل:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>البريد الإلكتروني:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>كلمة المرور:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>نوع العضوية:</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
          >
            <option value="free">عضوية مجانية (محتوى محدود)</option>
            <option value="paid">عضوية مدفوعة (مشاهدة جميع الفيديوهات)</option>
          </select>
        </div>
        <button type="submit">تسجيل</button>
      </form>
      <p>
        لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
      </p>
    </div>
  );
};

export default Register;
