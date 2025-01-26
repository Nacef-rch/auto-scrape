import { Dispatch, SetStateAction, createContext, useState } from "react";
import { AppNodeMissingInputs } from "@/types/appNode";

type FlowValidationContext = {
  invalidInputs: AppNodeMissingInputs[];
  setInvalidInputs: Dispatch<SetStateAction<AppNodeMissingInputs[]>>;
  clearErrors: () => void;
};

export const FlowValidationContext =
  createContext<FlowValidationContext | null>(null);

export const FlowValidationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [invalidInputs, setInvalidInputs] = useState<AppNodeMissingInputs[]>(
    []
  );

  const clearErrors = () => {
    setInvalidInputs([]);
  };

  const value = {
    invalidInputs,
    setInvalidInputs,
    clearErrors,
  };

  return (
    <FlowValidationContext.Provider value={value}>
      {children}
    </FlowValidationContext.Provider>
  );
};
