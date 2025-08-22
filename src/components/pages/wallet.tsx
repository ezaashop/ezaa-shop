"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRequestPayment } from "@/hooks/useCashback";
import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { H3, XSmall } from "../typography";
import Transactions from "./transactions";

const Wallet = () => {
  const { userId } = useAppSelector((state) => state.auth);
  const payments = useAppSelector((state) => state.cashback);
  const commissionNotifications = useAppSelector(
    (state) => state.notifications.commission
  );
  const { cashbackInfo, cashbackRequestInfo, wallet, commission } =
    payments || {};
  const totalWalletAmount = wallet?.userWalletTotal || 0;
  const totalCashback = cashbackInfo?.cash_back_sum || 0;
  const totalCommission = commission?.totalCommission?.totalCommission || 0;
  const minLimit = wallet?.minLimit || 0;

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState("");
  const { mutate, isPending } = useRequestPayment(userId || 0);
  // onSuccess: () => {
  //   setOpen(false);
  //   setAmount(0);
  //   toast.success("Cashback withdrawal request submitted successfully!");
  // },
  const handleRequest = () => {
    if (amount < minLimit) {
      setError(`Minimum withdrawal amount is ${minLimit} PKR`);
      return;
    }

    mutate(
      { amount },
      {
        onSuccess: () => {
          setOpen(false);
          setAmount(0);
          toast.success("Cashback withdrawal request submitted successfully!");
        },
      }
    );
  };

  const data = [
    {
      title: "Total Wallet Amount",
      value: `${totalWalletAmount} PKR`,
      link: "",
    },
    {
      title: "Cashback Total",
      value: `${totalCashback} PKR`,
      link: "",
    },
    {
      title: "Total Commission",
      value: `${totalCommission} PKR`,
      link: "/referrals",
    },
  ];

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {data.map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </div>
      {/* Withdraw Request Section */}
      <div className="space-y-2">
        <H3>Withdraw</H3>
        <div className="flex items-center gap-4 my-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant={"signature"}
                className="rounded-3xl text-lg"
              >
                Withdraw
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request Cashback Withdrawal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder={`Minimum ${minLimit} PKR`}
                  value={amount}
                  min={minLimit}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                />
                {error && <XSmall className="text-destructive">{error}</XSmall>}
              </div>
              <DialogFooter>
                <Button size="lg" onClick={handleRequest} disabled={isPending}>
                  {isPending ? "Processing..." : "Submit Request"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <p>Minimum withdraw balance: {minLimit}</p>
        </div>
      </div>
      <div className="space-y-2">
        <H3>Transactions</H3>
        <Transactions length={5} height={300} />
        <Link
          href="/transactions"
          className="text-2xl font-semibold text-signature"
        >
          View All
        </Link>
      </div>

      {/* Request Info Section */}
      {/* <div className="my-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Cashback Request Info
        </h2>
        {cashbackRequestInfo?.length === 0 ? (
          <p className="text-sm text-foreground">No cashback requests yet.</p>
        ) : (
          <pre className="bg-secondary p-3 rounded text-sm text-foreground">
            {cashbackRequestInfo?.map(({ amount, created_at }) => (
              <>
                <div
                  key={created_at}
                  className="flex items-end gap-2 border-b my-2"
                >
                  <Small>Requested for {amount} PKR</Small>
                  <XSmall className="text-muted-foreground">
                    {new Date(created_at).toLocaleString()}
                  </XSmall>
                </div>
              </>
            ))}
          </pre>
        )}
      </div> */}
    </div>
  );
};

export default Wallet;

// Reusable card component
const Card = ({
  title,
  value,
  link,
}: {
  title: string;
  value: string;
  link?: string;
}) => (
  <Link href={link || ""} className="bg-secondary p-4 rounded shadow">
    <p className="text-sm text-foreground mb-1">{title}</p>
    <p className="text-xl font-semibold text-foreground">{value}</p>
  </Link>
);
