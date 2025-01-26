import React from "react";
import Link from "next/link";
//libs
import { cn } from "@workspace/ui/lib/utils";
import { SquareDashedMousePointer } from "lucide-react";

type Props = {
  fontSize?: string;
  iconSize?: number;
};

const Logo = ({ fontSize = "text-2xl", iconSize = 20 }: Props) => {
  return (
    <Link
      href="/workflows"
      className={cn(
        "text-2xl font-extrabold flex items-center gap-2",
        fontSize
      )}
    >
      <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-2">
        <SquareDashedMousePointer size={iconSize} className="stroke-white" />{" "}
      </div>
      <div>
        <span className="text-emerald-500 dark:text-emerald-400">Nacef</span>
        <span className="text-stone-700 dark:text-stone-300"> Racheh</span>
      </div>
    </Link>
  );
};

export default Logo;
