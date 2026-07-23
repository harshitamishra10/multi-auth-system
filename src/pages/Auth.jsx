import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  loginUser,
  verifyOTP,
  resendOTP,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
  sendPhoneOTP,
  verifyPhoneOTP,
} from "../features/auth/authThunk";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneOTP, setPhoneOTP] = useState("");
  const [showPhoneOTP, setShowPhoneOTP] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showForgotPasswordOTP, setShowForgotPasswordOTP] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetOTP, setResetOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes

  const { loading } = useSelector((state) => state.auth);

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

    const result = await dispatch(registerUser(formData));

    if (registerUser.fulfilled.match(result)) {
      toast.success(result.payload.message);

      setShowOTP(true);
      setShowPhoneOTP(true);
      setTimer(300);
    } else {
      toast.error(result.payload);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      loginUser({
        email: formData.email,
        password: formData.password,
      })
    );

    if (loginUser.fulfilled.match(result)) {
      localStorage.setItem("token", result.payload.accessToken);

      toast.success(result.payload.message);

      navigate("/profile");
    } else {
      toast.error(result.payload);
    }
  };

  const handleVerifyOTP = async () => {
    const result = await dispatch(
      verifyOTP({
        email: formData.email,
        otp,
      })
    );

    if (verifyOTP.fulfilled.match(result)) {
      toast.success(result.payload.message);

      setShowOTP(false);
      setTimer(300);
      setIsLogin(true);
    } else {
      toast.error(result.payload);
    }
  };

  const handleResendOTP = async () => {
    const result = await dispatch(resendOTP(formData.email));

    if (resendOTP.fulfilled.match(result)) {
      toast.success(result.payload.message);

      setTimer(300);
    } else {
      toast.error(result.payload);
    }
  };

  const handleVerifyResetOTP = async () => {
    const result = await dispatch(
      verifyResetOTP({
        email: formData.email,
        otp: resetOTP,
      })
    );

    if (verifyResetOTP.fulfilled.match(result)) {
      toast.success(result.payload.message);

      setShowResetPassword(true);
    } else {
      toast.error(result.payload);
    }
  };

  const handleSendPhoneOTP = async () => {
    const result = await dispatch(sendPhoneOTP(formData.phone));

    if (sendPhoneOTP.fulfilled.match(result)) {
      toast.success(result.payload.message);

      setShowPhoneOTP(true);
    } else {
      toast.error(result.payload);
    }
  };

  // Verify Phone OTP
  const handleVerifyPhoneOTP = async () => {
    const result = await dispatch(
      verifyPhoneOTP({
        phone: formData.phone,
        otp: phoneOTP,
      })
    );

    if (verifyPhoneOTP.fulfilled.match(result)) {
      localStorage.setItem("token", result.payload.accessToken);

      toast.success(result.payload.message);

      navigate("/profile");
    } else {
      toast.error(result.payload);
    }
  };

  const handleForgotPassword = async () => {
    const result = await dispatch(forgotPassword(formData.email));

    if (forgotPassword.fulfilled.match(result)) {
      toast.success(result.payload.message);

      setShowForgotPasswordOTP(true);
    } else {
      toast.error(result.payload);
    }
  };

  const handleResetPassword = async () => {
    const result = await dispatch(
      resetPassword({
        email: formData.email,
        newPassword,
      })
    );

    if (resetPassword.fulfilled.match(result)) {
      toast.success(result.payload.message);

      setShowResetPassword(false);
      setShowForgotPasswordOTP(false);
      setShowForgotPassword(false);
      setIsLogin(true);
    } else {
      toast.error(result.payload);
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
          <button onClick={() => setIsLogin(false)}>Register</button>

          <button onClick={() => setIsLogin(true)}>Login</button>
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
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
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
              OTP Expires In: {Math.floor(timer / 60)}:
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

        {showForgotPassword && !showForgotPasswordOTP && (
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
          </div>
        )}

        {showForgotPasswordOTP && !showResetPassword && (
          <div
            style={{
              marginTop: "20px",
              borderTop: "1px solid #ccc",
              paddingTop: "20px",
            }}
          >
            <h3>Verify Reset OTP</h3>

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

            <button
              type="button"
              onClick={handleVerifyResetOTP}
              style={{
                width: "100%",
                padding: "10px",
              }}
            >
              Verify Reset OTP
            </button>
          </div>
        )}

        {showResetPassword && (
          <div
            style={{
              marginTop: "20px",
              borderTop: "1px solid #ccc",
              paddingTop: "20px",
            }}
          >
            <h3>Reset Password</h3>

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
