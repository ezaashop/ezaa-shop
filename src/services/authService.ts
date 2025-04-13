import { api } from "@/lib/axios";
import { Login, Signup } from "@/types";
import { formatApiError } from "@/utils/forApiErrors";

// ✅ Register
export const registerUser = async (data: Signup) => {
  try {
    const res = await api.post("/register", data);
    return res.data;
  } catch (error: any) {
    throw formatApiError(error);
  }
};

// ✅ Login
export const loginUser = async (data: Login) => {
  try {
    const res = await api.post("/login", data);
    return res.data;
  } catch (error: any) {
    throw formatApiError(error);
  }
};

// ✅ Logout
export const logoutUser = async (userId: string) => {
  try {
    const res = await api.post("/logout", { userId });
    return res.data;
  } catch (error: any) {
    throw formatApiError(error);
  }
};

// ✅ Forgot Password
export const forgotPassword = async (email: string) => {
  try {
    const res = await api.post("/forgetPassword", { email });
    return res.data;
  } catch (error: any) {
    throw formatApiError(error);
  }
};

// ✅ Verify OTP
export const verifyOTP = async (data: { otp: string; email: string }) => {
  try {
    const res = await api.post("/otpVerify", data);
    return res.data;
  } catch (error: any) {
    throw formatApiError(error);
  }
};

// ✅ Resend OTP
export const resendOTP = async (email: string) => {
  try {
    const res = await api.post("/otpResend", { email });
    return res.data;
  } catch (error: any) {
    throw formatApiError(error);
  }
};

// ✅ Reset Password
export const resetPassword = async (data: {
  email: string;
  newPassword: string;
}) => {
  try {
    const res = await api.post("/resetPassword", data);
    return res.data;
  } catch (error: any) {
    throw formatApiError(error);
  }
};

// ✅ Google Login
export const loginWithGoogle = async (token: string) => {
  try {
    const res = await api.post("/loginGoogle", { token });
    return res.data;
  } catch (error: any) {
    throw formatApiError(error);
  }
};

// ✅ Get User Info
export const getUserInfo = async (userId: string) => {
  try {
    const res = await api.get(`/getInfo/${userId}`);
    return res.data;
  } catch (error: any) {
    throw formatApiError(error);
  }
};

// ✅ Update User Info (with optional image)
export const updateUserInfo = async (
  userId: string,
  data: { name?: string; image?: string } // base64 or filename/URL depending on backend setup
) => {
  try {
    const res = await api.put(`/updateInfo/${userId}`, data);
    return res.data;
  } catch (error: any) {
    throw formatApiError(error);
  }
};
