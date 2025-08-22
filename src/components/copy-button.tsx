// components/ui/copy-button.tsx
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { Small } from "./typography";

interface CopyButtonProps {
  value: string;
  tooltip?: string;
  className?: string;
}

export const CopyButton = ({
  value,
  tooltip = "Copy",
  className,
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleCopy}
            size="icon"
            variant="ghost"
            className={"size-6"}
          >
            {copied ? (
              <CheckIcon className="size-4 text-green-500" />
            ) : (
              <CopyIcon className="size-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <Small>{copied ? "Copied!" : tooltip}</Small>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
