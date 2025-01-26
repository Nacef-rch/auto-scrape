import React from "react";
//components
import Logo from "@/components/logo";
import { ModeToggle } from "@/core/theme/theme-mode-toggle";
import { Separator } from "@workspace/ui/components/separator";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col w-full h-screen">
      {children}
      <Separator />
      <footer className="flex items-center justify-between p-2">
        <Logo iconSize={16} fontSize="text-xl" />
        <ModeToggle />
      </footer>
    </div>
  );
};

export default layout;
