"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setPendingReferralCode, setSourceUrl } from "@/lib/store/slices/referralSlice";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ReferralHandler = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((store) => store.auth);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for referral codes in URL parameters (both formats)
    const referralCode = searchParams.get("referral_code") || searchParams.get("code");
    
    if (referralCode) {
      // Store the referral code and source URL
      dispatch(setPendingReferralCode(referralCode));
      dispatch(setSourceUrl(window.location.href));
      
      // If user is not signed in, redirect to signup with referral code
      if (!userId) {
        // Use current domain for signup URL
        const currentDomain = window.location.origin;
        const signupUrl = `${currentDomain}/auth/signup?referralCode=${referralCode}`;
        window.location.href = signupUrl;
      } else {
        // If user is signed in, clean up the URL but don't redirect
        const url = new URL(window.location.href);
        url.searchParams.delete("referral_code");
        url.searchParams.delete("code");
        window.history.replaceState({}, "", url.toString());
      }
    }
  }, [searchParams, userId, dispatch]);

  return null; // This component doesn't render anything
};

export default ReferralHandler; 