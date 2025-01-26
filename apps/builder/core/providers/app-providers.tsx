"use client";
import React, { useState } from "react";
//libs
import NextTopLoader from "nextjs-toploader";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../theme/theme-provider";

type Props = {
  children: React.ReactNode;
};

const AppProviders = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ClerkProvider
      afterSignOutUrl={"/sign-in"}
      appearance={{
        elements: {
          formButtonPrimary:
            "bg-primary hover:bg-primary/90 text-sm !shadow-none",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <NextTopLoader color="#10b981" showSpinner={false} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default AppProviders;
