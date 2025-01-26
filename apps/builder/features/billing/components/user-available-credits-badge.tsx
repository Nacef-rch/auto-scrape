"use client";
import React from "react";
import Link from "next/link";
//libs
import { CoinsIcon, Loader2Icon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@workspace/ui/lib/utils";
//constants
import { CREDITS_REFETCH_INTERVAL } from "../constants";
//actions
import { GetAvailableCredits } from "../actions/getAvailableCredits";
//components
import { buttonVariants } from "@workspace/ui/components/button";
import ReactCountUpWrapper from "../../../components/react-count-up-wrapper";

const UserAvailableCreditsBadge = () => {
  const query = useQuery({
    queryKey: ["user-available-credits"],
    queryFn: () => GetAvailableCredits(),
    refetchInterval: CREDITS_REFETCH_INTERVAL,
  });
  return (
    <Link
      href={"/billing"}
      className={cn(
        "w-full space-x- items-center",
        buttonVariants({ variant: "outline" })
      )}
    >
      <CoinsIcon size={20} className="text-primary" />
      <span className="font-semibold capitalize">
        {query.isLoading && <Loader2Icon className="w-4 h-4 animate-spin" />}
        {!query.isLoading && query.data && (
          <ReactCountUpWrapper value={query.data} />
        )}
        {!query.isLoading && query.data === undefined && "-"}
      </span>
    </Link>
  );
};

export default UserAvailableCreditsBadge;
