import { cn } from "@/lib/utils";

const Loader = ({
  signature,
  className,
}: {
  signature?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full h-3 w-3 border-t-2 border-b-2",
        signature ? "border-signature" : "border-foreground",
        className
      )}
    ></div>
  );
};

export default Loader;
