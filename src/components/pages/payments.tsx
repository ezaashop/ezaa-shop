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
import { useState } from "react";
import { toast } from "sonner";
import { Small, XSmall } from "../typography";

const Payments = () => {
  const { userId } = useAppSelector((state) => state.auth);
  const payments = useAppSelector((state) => state.cashback);
  const {
    cashbackTransactions = [],
    cashbackInfo,
    cashbackRequestInfo,
    wallet,
    commission,
    loading,
  } = payments || {};

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

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card title="Total Wallet Amount" value={`${totalWalletAmount} PKR`} />
        <Card title="Cashback Total" value={`${totalCashback} PKR`} />
        <Card title="Total Commission" value={`${totalCommission} PKR`} />
      </div>
      {/* Withdraw Request Section */}
      <div className="flex items-center gap-2 my-4">
        <Small>Minimum withdraw balance: {minLimit}</Small>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant={"signature"} className="rounded-2xl">
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
              <Button onClick={handleRequest} disabled={isPending}>
                {isPending ? "Processing..." : "Submit Request"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>{" "}
      </div>

      {/* Request Info Section */}
      <div className="my-8">
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
                  {/* <Small>
                  Status: {status === 1 ? "Approved" : "Pending"}
                  </Small> */}
                </div>
              </>
            ))}
          </pre>
        )}
      </div>

      {/* Cashback Transactions */}
      <div className="bg-secondary shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Cashback Transactions
        </h2>
        {cashbackTransactions.length > 0 ? (
          <div className="max-h-[300px] overflow-y-auto border rounded-md">
            <table className="min-w-full table-auto">
              <thead className="sticky top-0 bg-muted-foreground text-foreground">
                <tr>
                  <th className="text-left p-2 text-sm font-medium">
                    Transaction ID
                  </th>
                  <th className="text-left p-2 text-sm font-medium">
                    Total Amount
                  </th>
                  <th className="text-left p-2 text-sm font-medium">
                    Cashback
                  </th>
                </tr>
              </thead>
              <tbody>
                {cashbackTransactions.map((txn) => (
                  <tr key={txn.transaction_id} className="border-t">
                    {/* <div className="flex items-center gap-2"> */}
                    <td className="p-2 text-sm">{txn.transaction_id}</td>
                    {/* <CopyButton value={txn.transaction_id} /> */}
                    {/* </div> */}
                    <td className="p-2 text-sm">{txn.total_amount} PKR</td>
                    <td className="p-2 text-sm">{txn.cash_back_return} PKR</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-foreground">No transactions available.</p>
        )}
      </div>
    </div>
  );
};

export default Payments;

// Reusable card component
const Card = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-secondary p-4 rounded shadow">
    <p className="text-sm text-foreground mb-1">{title}</p>
    <p className="text-xl font-semibold text-foreground">{value}</p>
  </div>
);
