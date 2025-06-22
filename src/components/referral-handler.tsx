// app/components/referral-handler.tsx
"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setPendingReferralCode, setSourceUrl } from "@/lib/store/slices/referralSlice";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const ReferralHandler = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((store) => store.auth);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Check for referral codes in URL parameters
    const referralCode = searchParams.get("referral_code") || searchParams.get("code");
    
    if (referralCode) {
      dispatch(setPendingReferralCode(referralCode));
      
      if (typeof window !== "undefined") {
        dispatch(setSourceUrl(window.location.href));
        
        if (!userId) {
          router.push(`/auth/signup?referralCode=${referralCode}`);
        } else {
          // Clean up URL
          const url = new URL(window.location.href);
          url.searchParams.delete("referral_code");
          url.searchParams.delete("code");
          window.history.replaceState({}, "", url.toString());
        }
      }
    }
  }, [searchParams, userId, dispatch, router]);

  return null;
};

export default ReferralHandler;