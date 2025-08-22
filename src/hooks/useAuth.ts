// hooks/useAuth.ts
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
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
import { AsyncResponse, User } from "@/types";

export const useRegister = () =>
  useMutation({
    mutationFn: registerUser,
  });

export const useLogin = () =>
  useMutation({
    mutationFn: loginUser,
  });

export const useLogout = () =>
  useMutation({
    mutationFn: logoutUser,
  });

export const useForgotPassword = () =>
  useMutation({
    mutationFn: forgotPassword,
  });

export const useVerifyOTP = () =>
  useMutation({
    mutationFn: verifyOTP,
  });

export const useResendOTP = () =>
  useMutation({
    mutationFn: resendOTP,
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: resetPassword,
  });

export const useGoogleLogin = () =>
  useMutation({
    mutationFn: loginWithGoogle,
  });

export const useUserInfo = (
  userId: number,
  options: Partial<UseQueryOptions<AsyncResponse<User>>> = {}
) =>
  useQuery<AsyncResponse<User>>({
    queryKey: ["user", userId],
    queryFn: () => getUserInfo(userId),
    enabled: !!userId,
    ...options,
  });
type Variables = {
  userId: number;
  data: any;
};
export const useUpdateUserInfo = (
  options?: UseMutationOptions<unknown, Error, Variables>
) => {
  return useMutation<unknown, Error, Variables>({
    mutationFn: ({ userId, data }) => updateUserInfo({ userId, data }),
    ...options,
  });
};
