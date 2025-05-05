"use client";

import { useGetBank, useCreateBank } from "@/hooks/useBank";
import { useAppSelector } from "@/lib/store/hooks";
import { BankAccount, BankAccountData, BankOption } from "@/types";
import BankAccountCard from "./cards/bank-account";
import { Skeleton } from "./ui/skeleton";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const BankAccounts = () => {
  const { userId } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetBank(userId || 0);
  const { banks } = useAppSelector((state) => state.appData);
  const [open, setOpen] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]); 
  const [form, setForm] = useState<BankAccountData>({
    bank_name: "",
    account_title: "",
    account_number: "",
  });

  useEffect(() => {
    if (data?.data?.userBank) {
      setBankAccounts(data.data.userBank);
    }
  }, [data]);

  const { mutate, isPending: isSubmitting } = useCreateBank(userId || 0);

  const handleSubmit = () => {
    if (!form.bank_name || !form.account_title || !form.account_number) {
      toast.error("Please fill all fields");
      return;
    }

    mutate(
      {
        ...form,
        ifsc_code: "",
      },
      {
        onSuccess: (response) => {
          toast.success("Bank account added");
          setForm({ bank_name: "", account_title: "", account_number: "" });
          setOpen(false);

          // Update local state with new bank
          setBankAccounts((prev) => [response.data.userBank, ...prev]);
        },
        onError: () => {
          toast.error("Failed to add bank account");
        },
      }
    );
  };

  return (
    <div>
      <div className="mb-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Bank Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Bank Account</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Bank Name</Label>
                <Select
                  onValueChange={(value: string) =>
                    setForm((prev) => ({ ...prev, bank_name: value }))
                  }
                  value={form.bank_name}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {banks?.map((bank: BankOption) => (
                      <SelectItem key={bank.id} value={bank.label}>
                        {bank.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Account Title</Label>
                <Input
                  placeholder="e.g. Bilal Hassan"
                  value={form.account_title}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      account_title: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <Label>Account Number</Label>
                <Input
                  placeholder="e.g. 01234567890"
                  value={form.account_number}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      account_number: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <BankAccountCardSkeleton key={i} />
          ))}
        </div>
      ) : bankAccounts.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bankAccounts.map((item: BankAccount) => (
            <BankAccountCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p>No bank accounts</p>
      )}
    </div>
  );
};

export default BankAccounts;

const BankAccountCardSkeleton = () => {
  return (
    <div className="border p-4 rounded-md shadow-sm space-y-3">
      <Skeleton className="h-5 w-2/3" />
      <div>
        <Skeleton className="h-3 w-1/3 mb-1" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div>
        <Skeleton className="h-3 w-1/3 mb-1" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>
    </div>
  );
};
