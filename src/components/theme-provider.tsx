"use client";

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev) {
    return (
      <NextThemesProvider
        {...props}
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}
        storageKey="portfolio-theme"
      >
        {children}
      </NextThemesProvider>
    );
  }

  return <>{children}</>;
}
