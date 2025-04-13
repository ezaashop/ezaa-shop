import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Providers from "@/app/providers";
import TopNav from "@/components/top-nav";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ezaa Shop",
  description: "Ezaa Shop - Shop anything you need",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html lang={locale} suppressHydrationWarning>
      <Providers>
        <body className={`flex flex-col min-h-screen`}>
          <TopNav />
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
