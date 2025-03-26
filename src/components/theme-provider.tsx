"use client";

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <>{children}</>
    // <NextThemesProvider
    //   {...props}
    //   attribute="class"
    //   defaultTheme="light"
    //   enableSystem={false}
    //   storageKey="portfolio-theme"
    // >
    //   {children}
    // </NextThemesProvider>
  );
}
