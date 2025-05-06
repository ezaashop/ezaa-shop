"use client";

import { useGetBank } from "@/hooks/useBank";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setBankAccounts } from "@/lib/store/slices/bankAccountSlice";
import { BankAccount } from "@/types";
import { useEffect } from "react";
import BankAccountCard from "./cards/bank-account";
import BankForm from "./forms/bank-form";
import { Skeleton } from "./ui/skeleton";

const BankAccounts = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.auth);
  const { accounts } = useAppSelector((state) => state.bankAccount);
  const { data, isLoading } = useGetBank(userId || 0);

  useEffect(() => {
    if (data?.data?.userBank) {
      dispatch(setBankAccounts(data.data.userBank));
    }
  }, [data, dispatch]);

  return (
    <div>
      <BankForm />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <BankAccountCardSkeleton key={i} />
          ))}
        </div>
      ) : accounts.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((item: BankAccount) => (
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
