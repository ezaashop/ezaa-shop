"use client";

import { useAppSelector } from "@/lib/store/hooks";

const Payments = () => {
  const payments = useAppSelector((state) => state.cashback);
  const {
    cashbackTransactions = [],
    cashbackInfo,
    cashbackRequestInfo,
    walletTotal,
    totalCommission,
    loading,
  } = payments || {};

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card
          title="Total Wallet Amount"
          value={`${walletTotal?.total || 0} PKR`}
        />
        <Card
          title="Cashback Total"
          value={`${cashbackInfo?.cash_back_sum || 0} PKR`}
        />
        <Card
          title="Total Commission"
          value={`${totalCommission?.totalCommission || 0} PKR`}
        />
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

      {/* Request Info Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Cashback Request Info
        </h2>
        {cashbackRequestInfo?.length === 0 ? (
          <p className="text-sm text-foreground">No cashback requests yet.</p>
        ) : (
          <pre className="bg-secondary p-3 rounded text-sm text-foreground">
            {JSON.stringify(cashbackRequestInfo, null, 2)}
          </pre>
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
