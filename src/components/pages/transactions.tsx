"use client";

import { Input } from "@/components/ui/input"; // Make sure you have some Input component
import { useAppSelector } from "@/lib/store/hooks";
import { useMemo, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { H5, H6, Small } from "../typography";

const Transactions = ({
  length,
  height,
}: {
  length?: number;
  height?: number;
}) => {
  const commissionNotifications = useAppSelector(
    (state) => state.notifications.commission
  );

  const [search, setSearch] = useState("");

  // Only filter if length is not provided
  const filteredList = useMemo(() => {
    const baseList = length
      ? commissionNotifications.slice(0, length)
      : commissionNotifications;

    if (length) return baseList;

    return baseList.filter((item) => {
      const formattedDate = new Date(item.created_at)
        .toLocaleDateString("en-GB") // DD/MM/YYYY
        .replace(/\//g, "-"); // optional if you want dashes

      const amount = item.bucketCommission?.toString();

      return formattedDate.includes(search) || amount?.includes(search);
    });
  }, [commissionNotifications, length, search]);

  const Row = ({ index, style }: { index: number; style: any }) => {
    const { descriptions, bucketCommission, created_at, seen } =
      filteredList[index];
    return (
      <div style={style} key={created_at} className="border-b px-2 py-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <H6>{descriptions}</H6>
          <H5 className="text-signature">
            Rs: {bucketCommission ? Number(bucketCommission).toFixed(4) : ""}
          </H5>
        </div>
        <Small className="text-muted-foreground text-right sm:text-left sm:mt-1">
          {new Date(created_at).toLocaleString()}
        </Small>
        {seen === "0" && (
          <Small className="text-yellow-700 dark:text-yellow-300">Unseen</Small>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {!length && (
        <div className="mb-2">
          <Input
            type="number"
            placeholder="Search transactions (by amount/date)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80"
          />
        </div>
      )}
      <List
        height={height || 600}
        itemCount={filteredList.length}
        itemSize={70}
        width="100%"
        className="custom-scrollbar"
      >
        {Row}
      </List>
    </div>
  );
};

export default Transactions;
