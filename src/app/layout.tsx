import Providers from "@/app/providers";
import AuthWrapper from "@/components/auth-wrapper";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import "react-photo-view/dist/react-photo-view.css";

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
      <body className={`flex flex-col min-h-screen`}>
        <Providers>
          <AuthWrapper>
            <Toaster />
            <div className="flex-1">{children}</div>
          </AuthWrapper>
        </Providers>
      </body>
    </html>
  );
}
