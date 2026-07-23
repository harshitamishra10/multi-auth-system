// import {
//   loginUser,
//   registerUser,
//   verifyOTP,
//   resendOTP,
//   forgotPassword,
//   verifyResetOTP,
//   resetPassword,
//   sendPhoneOTP,
//   verifyPhoneOTP,
// } from "./authThunk";

// const authSlice = createSlice({
//   name: "auth",
//   initialState,

//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.accessToken = null;
//       state.refreshToken = null;
//       state.isAuthenticated = false;
//       state.error = null;
//     },
//   },

//   extraReducers: (builder) => {
//     builder

//       // LOGIN
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.accessToken = action.payload.accessToken;
//         state.refreshToken = action.payload.refreshToken;
//         state.isAuthenticated = true;
//       })

//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // REGISTER
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(registerUser.fulfilled, (state) => {
//         state.loading = false;
//       })

//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // 👇 ADD VERIFY OTP HERE
//       .addCase(verifyOTP.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(verifyOTP.fulfilled, (state) => {
//         state.loading = false;
//       })

//       // .addCase(verifyOTP.rejected, (state, action) => {
//       //   state.loading = false;
//       //   state.error = action.payload;
//       .addCase(verifyOTP.rejected, (state, action) => {
//   state.loading = false;
//   state.error = action.payload;
// })

//         // RESEND OTP

// .addCase(resendOTP.pending, (state) => {
//   state.loading = true;
//   state.error = null;
// })

// .addCase(resendOTP.fulfilled, (state) => {
//   state.loading = false;
// })

// .addCase(resendOTP.rejected, (state, action) => {
//   state.loading = false;
//   state.error = action.payload;
// })
//       });

//       // FORGOT PASSWORD

// .addCase(forgotPassword.pending, (state) => {
//   state.loading = true;
//   state.error = null;
// })

// .addCase(forgotPassword.fulfilled, (state) => {
//   state.loading = false;
// })

// .addCase(forgotPassword.rejected, (state, action) => {
//   state.loading = false;
//   state.error = action.payload;
// })

// // VERIFY RESET OTP

// .addCase(verifyResetOTP.pending, (state) => {
//   state.loading = true;
//   state.error = null;
// })

// .addCase(verifyResetOTP.fulfilled, (state) => {
//   state.loading = false;
// })

// .addCase(verifyResetOTP.rejected, (state, action) => {
//   state.loading = false;
//   state.error = action.payload;
// })

// // RESET PASSWORD

// .addCase(resetPassword.pending, (state) => {
//   state.loading = true;
//   state.error = null;
// })

// .addCase(resetPassword.fulfilled, (state) => {
//   state.loading = false;
// })

// .addCase(resetPassword.rejected, (state, action) => {
//   state.loading = false;
//   state.error = action.payload;
// })

// // SEND PHONE OTP

// .addCase(sendPhoneOTP.pending, (state) => {
//   state.loading = true;
//   state.error = null;
// })

// .addCase(sendPhoneOTP.fulfilled, (state) => {
//   state.loading = false;
// })

// .addCase(sendPhoneOTP.rejected, (state, action) => {
//   state.loading = false;
//   state.error = action.payload;
// })

// // VERIFY PHONE OTP

// .addCase(verifyPhoneOTP.pending, (state) => {
//   state.loading = true;
//   state.error = null;
// })

// .addCase(verifyPhoneOTP.fulfilled, (state, action) => {
//   state.loading = false;
//   state.user = action.payload.user;
//   state.accessToken = action.payload.accessToken;
//   state.refreshToken = action.payload.refreshToken;
//   state.isAuthenticated = true;
// })

// .addCase(verifyPhoneOTP.rejected, (state, action) => {
//   state.loading = false;
//   state.error = action.payload;
// });

// //   },
// // });






import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  verifyOTP,
  resendOTP,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
  sendPhoneOTP,
  verifyPhoneOTP,
} from "./authThunk";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= LOGIN =================

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= REGISTER =================

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= VERIFY EMAIL OTP =================

      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyOTP.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= RESEND OTP =================

      .addCase(resendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(resendOTP.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(resendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= FORGOT PASSWORD =================

      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= VERIFY RESET OTP =================

      .addCase(verifyResetOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyResetOTP.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(verifyResetOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= RESET PASSWORD =================

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= SEND PHONE OTP =================

      .addCase(sendPhoneOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(sendPhoneOTP.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(sendPhoneOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= VERIFY PHONE OTP =================

      .addCase(verifyPhoneOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyPhoneOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })

      .addCase(verifyPhoneOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;