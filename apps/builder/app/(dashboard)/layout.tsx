import React from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
//core
import { ModeToggle } from "@/core/theme/theme-mode-toggle";
//components
import BreadcrumbHeader from "@/components/bread-crumb-header";
import { Separator } from "@workspace/ui/components/separator";
import UserAvailableCreditsBadge from "@/features/billing/components/user-available-credits-badge";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen">
      {/* <DesktopSideBar /> */}
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
          <BreadcrumbHeader />
          <div className="gap-1 flex items-center">
            <div className="p-2">
              <UserAvailableCreditsBadge />
            </div>
            <ModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <Separator />
        <div className="overflow-auto">
          <div className="flex-1 container py-4 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
