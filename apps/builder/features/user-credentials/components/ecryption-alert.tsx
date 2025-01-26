import React from "react";
import { ShieldIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";

type EncryptionAlertProps = {
  title: string;
  description: string;
};

const EncryptionAlert = ({ title, description }: EncryptionAlertProps) => {
  return (
    <Alert>
      <ShieldIcon className="h-4 w-4 stroke-primary" />
      <AlertTitle className="text-primary">{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default EncryptionAlert;
