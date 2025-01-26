import React from "react";

type NoPhaseSelectedProps = {
  title: string;
  description: string;
};

const NoPhaseSelected = ({ title, description }: NoPhaseSelectedProps) => {
  return (
    <div className="flex items-center flex-col gap-2 justify-center h-full w-full">
      <div className="flex flex-col gap-1 text-center">
        <p className="font-bold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default NoPhaseSelected;
