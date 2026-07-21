import { useState, useEffect } from "react";
import API from "../api/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneOTP, setPhoneOTP] = useState("");
  const [showPhoneOTP, setShowPhoneOTP] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetOTP, setResetOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [timer, setTimer] =useState(300); // 5 minutes



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
useEffect(() => {
  if (!showOTP) return;
  if (timer <= 0) return;

  const interval = setInterval(() => {
    setTimer((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timer, showOTP]);

  const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/register", formData);
    toast.success(res.data.message);
    setShowOTP(true);
    setShowPhoneOTP(true);
    setTimer(300); // Timer start

  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
  }
};
    const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.accessToken);

      toast.success(res.data.message);

      navigate("/profile");

    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
    const handleVerifyOTP = async () => {
    try {
      const res = await API.post("/verify-otp", {
        email: formData.email,
        otp,
      });

      toast.success(res.data.message);

      setShowOTP(false);
      setTimer(300);
      setIsLogin(true);

    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

const handleResendOTP = async () => {
  try {
    const res = await API.post("/resend-otp", {
      email: formData.email,
    });

    toast.success(res.data.message);

    // Restart OTP timer
    setTimer(300);

  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
  }
};
  const handleSendPhoneOTP = async () => {
  try {
    const res = await API.post("/send-phone-otp", {
      phone: formData.phone,
    });

    toast.success(res.data.message);
  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
  }
};
const handleVerifyPhoneOTP = async () => {
  try {
    const res = await API.post("/verify-phone-otp", {
      phone: formData.phone,
      otp: phoneOTP,
    });

    toast.success(res.data.message);

    setShowPhoneOTP(false);

  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
  }
};

const handleForgotPassword = async () => {
  try {
    const res = await API.post("/forgot-password", {
      email: forgotEmail,
    });

    toast.success(res.data.message);
  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
  }
};

const handleResetPassword = async () => {
  try {
    const res = await API.post("/reset-password", {
      email: forgotEmail,
      otp: resetOTP,
      newPassword,
    });

    toast.success(res.data.message);

    setShowForgotPassword(false);

  } catch (err) {
    toast.error(err.response?.data?.message || err.message);
  }
};
    return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          width: "400px",
          border: "1px solid gray",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          {isLogin ? "Login" : "Register"}
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <button onClick={() => setIsLogin(false)}>
            Register
          </button>

          <button onClick={() => setIsLogin(true)}>
            Login
          </button>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleRegister}>
                    {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: "95%",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              />

              <input
                type="text"
                name="phone"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  width: "95%",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: "95%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: "95%",
              padding: "10px",
              marginBottom: "20px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            {isLogin ? "Login" : "Register"}
          </button>
          {isLogin && (
  <button
    type="button"
    onClick={() => setShowForgotPassword(!showForgotPassword)}
    style={{
      width: "100%",
      marginTop: "10px",
      padding: "10px",
    }}
  >
    Forgot Password?
  </button>
)}

        </form>
                {showOTP && (
          <div
            style={{
              marginTop: "20px",
              borderTop: "1px solid #ccc",
              paddingTop: "20px",
            }}
          >
            <h3>Verify Email OTP</h3>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{
                width: "95%",
                padding: "10px",
                marginBottom: "10px",
              }}
            />
            <button
  type="button"
  onClick={handleVerifyOTP}
  disabled={timer === 0}
  style={{
    width: "100%",
    padding: "10px",
    cursor: timer === 0 ? "not-allowed" : "pointer",
    opacity: timer === 0 ? 0.5 : 1,
  }}
>
  Verify OTP
</button>
<p
  style={{
    textAlign: "center",
    color: timer <= 60 ? "red" : "green",
    marginBottom: "10px",
  }}
>
  OTP Expires In:
  {Math.floor(timer / 60)}:
  {String(timer % 60).padStart(2, "0")}
</p>
<button
  type="button"
  onClick={handleResendOTP}
  disabled={timer > 0}
  style={{
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    cursor: timer > 0 ? "not-allowed" : "pointer",
    opacity: timer > 0 ? 0.5 : 1,
  }}
>
  Resend OTP
</button>
          </div>
        )}
        {showPhoneOTP && (
  <div
    style={{
      marginTop: "20px",
      borderTop: "1px solid #ccc",
      paddingTop: "20px",
    }}
  >
    <h3>Phone OTP Verification</h3>

    <button
      type="button"
      onClick={handleSendPhoneOTP}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      Send Phone OTP
    </button>

    <input
      type="text"
      placeholder="Enter Phone OTP"
      value={phoneOTP}
      onChange={(e) => setPhoneOTP(e.target.value)}
      style={{
        width: "95%",
        padding: "10px",
        marginBottom: "10px",
      }}
    />

    <button
      type="button"
      onClick={handleVerifyPhoneOTP}
      style={{
        width: "100%",
        padding: "10px",
      }}
    >
      Verify Phone OTP
    </button>
  </div>
)}

{showForgotPassword && (
  <div
    style={{
      marginTop: "20px",
      borderTop: "1px solid #ccc",
      paddingTop: "20px",
    }}
  >
    <h3>Forgot Password</h3>

    <input
      type="email"
      placeholder="Enter Email"
      value={forgotEmail}
      onChange={(e) => setForgotEmail(e.target.value)}
      style={{
        width: "95%",
        padding: "10px",
        marginBottom: "10px",
      }}
    />

    <button
      type="button"
      onClick={handleForgotPassword}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      Send Reset OTP
    </button>

    <input
      type="text"
      placeholder="Enter Reset OTP"
      value={resetOTP}
      onChange={(e) => setResetOTP(e.target.value)}
      style={{
        width: "95%",
        padding: "10px",
        marginBottom: "10px",
      }}
    />

    <input
      type="password"
      placeholder="Enter New Password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      style={{
        width: "95%",
        padding: "10px",
        marginBottom: "10px",
      }}
    />

    <button
      type="button"
      onClick={handleResetPassword}
      style={{
        width: "100%",
        padding: "10px",
      }}
    >
      Reset Password
    </button>
  </div>
)}

              </div>
    </div>
  );
};

export default Auth;