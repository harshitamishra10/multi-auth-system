// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../api/axios";

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (loginData, { rejectWithValue }) => {
//     // login code
//   }
// );

// export const registerUser = createAsyncThunk(
//   "auth/registerUser",
//   async (userData, { rejectWithValue }) => {
//     // register code
//   }
// );

// // Login User
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (loginData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("/login", loginData);

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Login Failed"
//       );
//     }
//   }
// );



import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await API.post("/login", loginData);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await API.post("/register", userData);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Verify Email OTP
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (otpData, { rejectWithValue }) => {
    try {
      const res = await API.post("/verify-otp", otpData);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Resend OTP
export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async (email, { rejectWithValue }) => {
    try {
      const res = await API.post("/resend-otp", { email });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await API.post("/forgot-password", { email });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Verify Reset Password OTP
export const verifyResetOTP = createAsyncThunk(
  "auth/verifyResetOTP",
  async (otpData, { rejectWithValue }) => {
    try {
      const res = await API.post("/verify-reset-otp", otpData);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (resetData, { rejectWithValue }) => {
    try {
      const res = await API.post("/reset-password", resetData);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Send Phone OTP
export const sendPhoneOTP = createAsyncThunk(
  "auth/sendPhoneOTP",
  async (phone, { rejectWithValue }) => {
    try {
      const res = await API.post("/send-phone-otp", {
        phone,
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const verifyPhoneOTP = createAsyncThunk(
  "auth/verifyPhoneOTP",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("/auth/verify-phone-otp", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);