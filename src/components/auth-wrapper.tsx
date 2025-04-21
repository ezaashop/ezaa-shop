"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setToken, setUser, setUserId } from "@/lib/store/slices/authSlice";
import { useUserInfo } from "@/hooks/useAuth";
const AuthWrapper = () => {
  const dispatch = useAppDispatch();
  const { token, userId, user } = useAppSelector((store) => store.auth);
  const {
    data: userInfo,
    isPending,
    isError,
  } = useUserInfo(userId || "", {
    enabled: !!userId,
  });

  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!token && !userId) {
      const storedToken = localStorage.getItem("token");
      const storedUserId = localStorage.getItem("userid");
      if (storedToken && storedUserId) {
        dispatch(setToken(storedToken));
        dispatch(setUserId(storedUserId));
      }
    }
  }, [token, userId, dispatch]);

  useEffect(() => {
    // Either token & userId present (auth done)
    if (token && userId) {
      setLoading(false);
    }

    // OR if no token & userId after checking localStorage
    if (!token && !userId) {
      setLoading(false); // Stop loading so redirect can happen
    }
  }, [token, userId]);

  useEffect(() => {
    if (userInfo) {
      dispatch(setUser(userInfo?.data?.user));
      setLoading(false);
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    const isAuthenticated = token && userId;

    if (!loading) {
      // If not authenticated, and path is not an auth route
      if (!isAuthenticated && !pathname?.startsWith("/auth")) {
        router.push("/auth/login");
      }

      // If authenticated, and path is an auth route (like /auth/login)
      if (isAuthenticated && pathname?.startsWith("/auth")) {
        router.push("/");
      }
    }
  }, [token, userId, pathname, router, loading]);

  return null;
};

export default AuthWrapper;
