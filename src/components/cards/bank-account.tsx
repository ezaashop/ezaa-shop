import { BankAccount } from "@/types";
import { H4, H6, Label } from "../typography";
import { CopyButton } from "../copy-button";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";

const BankAccountCard = ({ item }: { item: BankAccount }) => {
  const handleEdit = () => {
    console.log("Edit clicked", item);
    // Add your edit logic here
  };

  const handleDelete = () => {
    console.log("Delete clicked", item);
    // Add your delete logic here
  };

  return (
    <div className="border p-4 rounded-md shadow-sm space-y-2 relative">
      {/* Edit and Delete buttons - top right */}
      <div className="absolute top-2 right-2 flex gap-2">
        <Button size="icon" variant="ghost" onClick={handleEdit}>
          <PencilIcon className="size-5" />
        </Button>
        <Button size="icon" variant="ghost" onClick={handleDelete}>
          <Trash2Icon className="size-5 text-destructive" />
        </Button>
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
