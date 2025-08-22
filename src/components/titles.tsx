"use client";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineArrowBack } from "react-icons/md";
import Container from "./container";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const PageTitle = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <Container className="h-20">
      {/* Back Button */}
      <div className="flex items-center w-ful h-full gap-4 md:gap-8 capitalize">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"secondary"}
              onClick={() => router.back()}
              className="px-2"
            >
              <MdOutlineArrowBack size={24} />
            </Button>
          </TooltipTrigger>
          <TooltipContent align="start">
            <p className="">Go Back</p>
          </TooltipContent>
        </Tooltip>

        <h3 className="text-2xl md:text-4xl font-semibold text-center">
          {title}
        </h3>
      </div>
    </Container>
  );
};

export const SectionTitle = ({ title }: { title: string }) => {
  const shadow = false;
  return (
    <div className="relative flex items-center justify-start capitalize overflow-hidden">
      {shadow && (
        <h1 className="absolute font-black text-transparent bg-gradient-to-t from-transparent via-foreground/5 to-transparent bg-clip-text top-0 -translate-y-1/4 whitespace-nowrap pointer-events-none">
          {title}
        </h1>
      )}
      <h3 className="relative font-bold text-foreground">{title}</h3>
    </div>
  );
};

export const FormTitle = ({ title }: { title: string }) => {
  return <h4 className="font-bold border-b mb-4">{title}</h4>;
};

export const TitleBar = ({
  title,
  noLink,
}: {
  title: string;
  noLink?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-background">
      {title && (
        <h4 className="capitalize font-semibold text-signature">{title}</h4>
      )}
      {!noLink && (
        <Link href={`/admin/dashboard/${title}/add`} className="">
          <Button size="sm">
            <Plus />
            <span className="hidden sm:inline-block ml-2 capitalize">{`Add ${title}`}</span>
          </Button>
        </Link>
      )}
    </div>
  );
};
