import React from "react";
//libs
import { AlertCircle } from "lucide-react";
//components
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";

type AlertErrorProps = {
  title?: string;
  description?: string;
  showIcon?: boolean;
};

const AlertError = ({
  title = "Error",
  description = "Something went wrong, please try again later",
  showIcon = true,
}: AlertErrorProps) => {
  return (
    <Alert variant={"destructive"}>
      {showIcon && <AlertCircle className="w-4 h-4" />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertError;
