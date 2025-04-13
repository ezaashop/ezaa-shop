// hooks/useAuth.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  verifyOTP,
  resendOTP,
  resetPassword,
  loginWithGoogle,
  getUserInfo,
  updateUserInfo,
} from "@/services/authService";

// ✅ Register Hook
export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

// ✅ Login Hook
export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

// ✅ Logout Hook
export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};

// ✅ Forgot Password Hook
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

// ✅ Verify OTP Hook
export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: verifyOTP,
  });
};

// ✅ Resend OTP Hook
export const useResendOTP = () => {
  return useMutation({
    mutationFn: resendOTP,
  });
};

// ✅ Reset Password Hook
export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};

// ✅ Google Login Hook
export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: loginWithGoogle,
  });
};

// ✅ Get User Info Hook (Fetch user data)
export const useUserInfo = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserInfo(userId),
    enabled: !!userId, // Only run the query if userId exists
  });
};

// // ✅ Update User Info Hook (Update name/image)
// export const useUpdateUserInfo = () => {
//   return useMutation({
//     mutationFn: updateUserInfo,
//   });
// };
