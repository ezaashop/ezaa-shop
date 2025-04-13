"use client"
import { ThemeProvider } from "@/components/theme-provider";
import queryClient from "@/lib/queryClient";
import StoreProvider from "@/redux/storeProvider";
import { QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>{children}</StoreProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers