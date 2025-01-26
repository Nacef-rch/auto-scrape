import React, { Suspense } from "react";
//components
import Loading from "./loading";
import EncryptionAlert from "@/features/user-credentials/components/ecryption-alert";
import CreateCredentialDialog from "@/features/user-credentials/components/create-credential-dialog";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Credentials</h1>
          <p className="text-muted-foreground">Manage your credentials</p>
        </div>
        <CreateCredentialDialog />
      </div>
      <div className="h-full py-6 space-y-8">
        <EncryptionAlert
          title="Encryption"
          description="All information is securely encrypted, ensuring your data remains safe"
        />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
};

export default layout;
