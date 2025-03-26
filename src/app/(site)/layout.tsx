import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import TopNav from "@/components/top-nav";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default SiteLayout;
