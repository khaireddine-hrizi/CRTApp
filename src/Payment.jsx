import React from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const handlePaymentSuccess = () => {
    updateUser({ isPaid: true });
    alert("تمت عملية الدفع بنجاح! يمكنك الآن مشاهدة جميع الفيديوهات.");
    navigate("/videos");
  };

  return (
    <div className="payment-form">
      <h2>الدفع للاشتراك المميز</h2>
      <p>سعر الاشتراك: 50 دينار تونسي/شهر</p>

      {/* ... عناصر نموذج الدفع ... */}

      <button onClick={handlePaymentSuccess}>
        محاكاة عملية دفع ناجحة (للتجربة)
      </button>
    </div>
  );
};

export default Payment;
