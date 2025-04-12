import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
  });
  const [step, setStep] = useState(1); // 1: Registration, 2: Verification
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Send verification code (simulated)
  const sendVerificationCode = () => {
    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCodeSent(true);
      // In real app, you would send the code to user's email
      alert(`كود التحقق: 123456 (هذا للاختبار فقط)`);
    }, 1500);
  };

  // Handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Step 1: Validate and send verification code
    if (step === 1) {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setError("الرجاء ملء جميع الحقول");
        return;
      }

      if (!validateEmail(formData.email)) {
        setError("البريد الإلكتروني غير صحيح");
        return;
      }

      if (formData.password.length < 6) {
        setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("كلمات المرور غير متطابقة");
        return;
      }

      sendVerificationCode();
      setStep(2);
      return;
    }

    // Step 2: Verify code and complete registration
    if (step === 2) {
      if (!formData.verificationCode) {
        setError("الرجاء إدخال كود التحقق");
        return;
      }

      // Simulate code verification (in real app, verify with backend)
      if (formData.verificationCode !== "123456") {
        setError("كود التحقق غير صحيح");
        return;
      }

      try {
        setIsLoading(true);
        // Register user
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          isVerified: true,
        });

        // Redirect to login page after successful registration
        navigate("/login", { state: { registrationSuccess: true } });
      } catch (err) {
        setError(
          "حدث خطأ أثناء التسجيل. قد يكون البريد الإلكتروني مستخدمًا بالفعل."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>إنشاء حساب جديد</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="form-group">
                <label>الاسم الكامل:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="أدخل اسمك الكامل"
                  required
                />
              </div>

              <div className="form-group">
                <label>البريد الإلكتروني:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>كلمة المرور:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="6 أحرف على الأقل"
                  minLength="6"
                  required
                />
              </div>

              <div className="form-group">
                <label>تأكيد كلمة المرور:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="أعد إدخال كلمة المرور"
                  required
                />
              </div>
            </>
          )}

          {step === 2 && (
            <div className="verification-step">
              <div className="form-group">
                <label>كود التحقق:</label>
                <input
                  type="text"
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  placeholder="أدخل الكود المكون من 6 أرقام"
                  maxLength="6"
                  required
                />
                <p className="verification-info">
                  تم إرسال كود التحقق إلى {formData.email}
                </p>
              </div>
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (
              <span>جاري المعالجة...</span>
            ) : step === 1 ? (
              "إرسال كود التحقق"
            ) : (
              "تأكيد التسجيل"
            )}
          </button>
        </form>

        {step === 2 && (
          <button
            className="resend-code"
            onClick={sendVerificationCode}
            disabled={isLoading}
          >
            إعادة إرسال كود التحقق
          </button>
        )}

        <div className="auth-footer">
          <p>
            لديك حساب بالفعل؟ <a href="/login">سجل الدخول هنا</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
