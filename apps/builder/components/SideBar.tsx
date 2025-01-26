"use client";
import React from "react";
//components
import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  ShieldCheckIcon,
} from "lucide-react";
import Logo from "./logo";
import UserAvailableCreditsBadge from "../features/billing/components/user-available-credits-badge";

const routes = [
  {
    href: "",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "workflows",
    label: "Workflows",
    icon: Layers2Icon,
  },
  {
    href: "credentials",
    label: "Credentials",
    icon: ShieldCheckIcon,
  },
  {
    href: "billing",
    label: "Billing",
    icon: CoinsIcon,
  },
];

const DesktopSideBar = () => {
  return (
    <div>
      <Logo />
      <div className="p-2">
        <UserAvailableCreditsBadge />
      </div>
      <span> use Shadcn UI sideBar !</span>
    </div>
  );
};

export default DesktopSideBar;
