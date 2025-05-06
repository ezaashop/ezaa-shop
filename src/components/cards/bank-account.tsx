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
import { useDeleteAccount } from "@/hooks/useBank";
import { useAppDispatch } from "@/lib/store/hooks";
import { deleteBankAccount } from "@/lib/store/slices/bankAccountSlice";
import { BankAccount } from "@/types";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CopyButton } from "../copy-button";
import BankForm from "../forms/bank-form";
import { H4, H6, Label } from "../typography";
import Loader from "../loader";

const BankAccountCard = ({ item }: { item: BankAccount }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const { mutate: deleteAcc, isPending } = useDeleteAccount(item.id || 0);

  const handleDelete = () => {
    deleteAcc(undefined, {
      onSuccess: () => {
        dispatch(deleteBankAccount(item.id || 0));
        toast.success("Bank account deleted");
        setOpen(false);
      },
      onError: () => {
        toast.error("Failed to delete account");
      },
    });
  };

  return (
    <div className="border p-4 rounded-md shadow-sm space-y-2 relative">
      {/* Edit and Delete buttons - top right */}
      <div className="absolute top-2 right-2 flex gap-2">
        <BankForm bank={item} />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="icon" variant="ghost">
              <Trash2Icon className="size-5 text-destructive" />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this bank account?</p>
            <DialogFooter className="pt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                variant="destructive"
                disabled={isPending}
              >
                {isPending ? <Loader /> : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <H4>{item.bank_name}</H4>
      <div>
        <Label className="text-signature">Account Name</Label>
        <H6>{item.account_title}</H6>
      </div>
      <div>
        <Label className="text-signature">Account Number</Label>
        <div className="flex items-center gap-2">
          <H6 className="select-text">{item.account_number}</H6>
          <CopyButton value={item.account_number.toString()} />
        </div>
      </div>
    </div>
  );
};

export default BankAccountCard;
