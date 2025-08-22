"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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
import { Label } from "@/components/ui/label";
import { useCreateBank, useUpdateAccount } from "@/hooks/useBank";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  addBankAccount,
  updateBankAccount,
} from "@/lib/store/slices/bankAccountSlice";
import { BankAccount, BankOption } from "@/types";

import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Loader2, PencilIcon } from "lucide-react";

// Validation schema
const BankSchema = z.object({
  bank_name: z.string().min(1, "Bank is required"),
  account_title: z.string().min(1, "Title is required"),
  account_number: z.string().min(1, "Account number is required"),
});

const BankForm = ({ bank }: { bank?: BankAccount }) => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const isEditing = Boolean(bank);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BankAccount>({
    resolver: zodResolver(BankSchema),
    defaultValues: {
      bank_name: "",
      account_title: "",
      account_number: "",
    },
  });

  const { mutate: createBank, isPending: isCreating } = useCreateBank(
    userId || 0
  );
  const { mutate: updateBank, isPending: isUpdating } = useUpdateAccount(
    bank?.id || 0
  );

  useEffect(() => {
    if (bank) {
      reset(bank);
    }
  }, [bank, reset]);

  const onSubmit = (data: BankAccount) => {
    const payload = { ...data, ifsc_code: "" };

    if (isEditing) {
      updateBank(payload, {
        onSuccess: ({ data }) => {
          toast.success("Bank account updated");
          dispatch(updateBankAccount(data.updateAccount));
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to update bank account");
        },
      });
    } else {
      createBank(payload, {
        onSuccess: ({ data }) => {
          toast.success("Bank account added");
          dispatch(addBankAccount(data.userBank));
          reset();
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to add bank account");
        },
      });
    }
  };

  return (
    <div className="mb-4">
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogTrigger asChild>
          {isEditing ? (
            <Button size="icon" variant="ghost">
              <PencilIcon className="size-5" />
            </Button>
          ) : (
            <Button>Add Bank Account</Button>
          )}
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit" : "Add"} Bank Account</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Bank Name</Label>
              <Controller
                control={control}
                name="bank_name"
                render={({ field }) => <BankSelect field={field} />}
              />
              {errors.bank_name && (
                <p className="text-red-500 text-sm">
                  {errors.bank_name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Account Title</Label>
              <Controller
                control={control}
                name="account_title"
                render={({ field }) => (
                  <Input placeholder="e.g. Bilal Hassan" {...field} />
                )}
              />
              {errors.account_title && (
                <p className="text-red-500 text-sm">
                  {errors.account_title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Account Number</Label>
              <Controller
                control={control}
                name="account_number"
                render={({ field }) => (
                  <Input placeholder="e.g. 01234567890" {...field} />
                )}
              />
              {errors.account_number && (
                <p className="text-red-500 text-sm">
                  {errors.account_number.message}
                </p>
              )}
            </div>

            <DialogFooter className="pt-4">
              <Button type="submit" disabled={isCreating || isUpdating}>
                {isCreating || isUpdating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : isEditing ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BankForm;

const BankSelect = ({ field }: { field: any }) => {
  const [open, setOpen] = useState(false);
  const { banks } = useAppSelector((state) => state.appData);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full flex justify-between">
          {field.value || "Select bank"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width]">
        <Command>
          <CommandInput placeholder="Search bank..." />
          <CommandList>
            <CommandEmpty>No bank found.</CommandEmpty>
            <CommandGroup>
              {banks?.map((bank: BankOption) => (
                <CommandItem
                  key={bank.id}
                  value={bank.label}
                  onSelect={() => {
                    field.onChange(bank.label);
                    setOpen(false);
                  }}
                  className="cursor-pointer flex justify-between items-center"
                >
                  {bank.label}
                  {field.value === bank.label && (
                    <Check className="ml-auto h-4 w-4 text-primary" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
