import React from "react";
//libs
import { LockKeyholeIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
//types
import type { Credential } from "@workspace/db";
//components
import { Card } from "@workspace/ui/components/card";
import DeleteCredentialDialog from "./components/delete-credential-dialog";

interface UserCredentialsProps {
  credentials: Credential[];
}

const UserCredentials: React.FC<UserCredentialsProps> = ({ credentials }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {credentials.map((credential) => {
        const createdAt = formatDistanceToNow(credential.createdAt, {
          addSuffix: true,
        });
        return (
          <Card key={credential.id} className="w-full p-4 flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center">
                <LockKeyholeIcon size={18} className="stroke-primary" />
              </div>
              <div>
                <p className="font-bold">{credential.name}</p>
                <p className="text-xs text-muted-foreground">{createdAt}</p>
              </div>
            </div>
            <DeleteCredentialDialog name={credential.name} />
          </Card>
        );
      })}
    </div>
  );
};

export default UserCredentials;
