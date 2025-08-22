// services/authService.ts
import { asyncHandler } from "@/lib/asyncHandler";
import { api, multiPartApi } from "@/lib/axios";
import { Login, Signup } from "@/types";

export const registerUser = (data: Signup) =>
  asyncHandler(() => api.post("/register", data).then((res) => res.data));

export const loginUser = (data: Login) =>
  asyncHandler(() => api.post("/login", data).then((res) => res.data));

export const logoutUser = (userId: string) =>
  asyncHandler(() => api.post("/logout", { userId }).then((res) => res.data));

export const forgotPassword = (email: string) =>
  asyncHandler(() =>
    api.post("/forgetPassword", { email }).then((res) => res.data)
  );

export const verifyOTP = (data: { otp: string; email: string }) =>
  asyncHandler(() => api.post("/otpVerify", data).then((res) => res.data));

export const resendOTP = (email: string) =>
  asyncHandler(() => api.post("/otpResend", { email }).then((res) => res.data));

export const resetPassword = (data: { email: string; newPassword: string }) =>
  asyncHandler(() => api.post("/resetPassword", data).then((res) => res.data));

export const loginWithGoogle = (token: string) =>
  asyncHandler(() =>
    api.post("/loginGoogle", { token }).then((res) => res.data)
  );

export const getUserInfo = (userId: number) =>
  asyncHandler(() => api.get(`/getInfo/${userId}`).then((res) => res.data));

// Update the function to accept a single object
export const updateUserInfo = ({
  userId,
  data,
}: {
  userId: number;
  data: any;
}) =>
  asyncHandler(() =>
    multiPartApi.post(`updateInfo/${userId}`, data).then((res) => res.data)
  );
