import FetchWrapper from "@/components/fetch-wrapper";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <FetchWrapper>
      <div className="h-full">{children}</div>;
    </FetchWrapper>
  );
};

export default SiteLayout;
