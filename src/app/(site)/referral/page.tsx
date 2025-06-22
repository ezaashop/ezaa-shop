"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/container";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RiUserSharedLine, RiGiftLine, RiTeamLine } from "react-icons/ri";
import Link from "next/link";

const ReferralPage = () => {
  const { userId } = useAppSelector((store) => store.auth);
  const { pendingReferralCode } = useAppSelector((store) => store.referral);
  const searchParams = useSearchParams();
  const [referralCode, setReferralCode] = useState<string>("");

  useEffect(() => {
    // Get referral code from URL or store
    const urlCode = searchParams.get("code");
    const code = urlCode || pendingReferralCode || "";
    setReferralCode(code);
  }, [searchParams, pendingReferralCode]);

  const handleCopyReferralCode = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      toast.success("Referral code copied to clipboard!");
    }
  };

  const handleSignup = () => {
    const currentDomain = window.location.origin;
    if (referralCode) {
      window.location.href = `${currentDomain}/auth/signup?referralCode=${referralCode}`;
    } else {
      window.location.href = `${currentDomain}/auth/signup`;
    }
  };

  if (!referralCode) {
    return (
      <Container title="Referral">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <RiUserSharedLine className="text-6xl text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Invalid Referral Link</h1>
          <p className="text-muted-foreground mb-4">
            This referral link is invalid or has expired.
          </p>
          <Link href="/">
            <Button variant="signature">Go to Home</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container title="Referral">
      <div className="max-w-2xl mx-auto py-8">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-signature/10 rounded-full flex items-center justify-center mb-4">
              <RiGiftLine className="text-2xl text-signature" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {userId ? "Welcome Back!" : "Join Our Community!"}
            </CardTitle>
            <p className="text-muted-foreground">
              {userId 
                ? "You're already signed in. Share this referral code with friends!"
                : "You've been invited to join our community with a special referral code."
              }
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Referral Code Display */}
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Referral Code</h3>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg font-mono bg-background px-3 py-2 rounded border">
                  {referralCode}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyReferralCode}
                >
                  Copy
                </Button>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <RiGiftLine className="text-2xl text-signature mx-auto mb-2" />
                <h4 className="font-semibold">Earn Rewards</h4>
                <p className="text-sm text-muted-foreground">
                  Get commission on every purchase
                </p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <RiTeamLine className="text-2xl text-signature mx-auto mb-2" />
                <h4 className="font-semibold">Build Team</h4>
                <p className="text-sm text-muted-foreground">
                  Invite friends and grow together
                </p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <RiUserSharedLine className="text-2xl text-signature mx-auto mb-2" />
                <h4 className="font-semibold">Share & Earn</h4>
                <p className="text-sm text-muted-foreground">
                  Share your code and earn more
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            {!userId ? (
              <div className="space-y-3">
                <Button
                  variant="signature"
                  size="lg"
                  className="w-full"
                  onClick={handleSignup}
                >
                  Sign Up with Referral Code
                </Button>
                <p className="text-xs text-muted-foreground">
                  By signing up, you agree to our terms and conditions
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <Link href="/referrals">
                  <Button variant="signature" size="lg" className="w-full">
                    View My Referrals
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" size="lg" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default ReferralPage; 