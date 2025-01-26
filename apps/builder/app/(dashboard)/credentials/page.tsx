import React from "react";
import dynamic from "next/dynamic";
//libs
import { ShieldOffIcon } from "lucide-react";
//actions
import { getCredentialsForUser } from "@/features/user-credentials/actions/getCredentialsForUser";
//components
import AlertError from "@/components/alert-error";
import UserDataNotFound from "@/components/data-not-found";
import CreateCredentialDialog from "../../../features/user-credentials/components/create-credential-dialog";

const LazyUserCredentials = dynamic(
  () => import("@/features/user-credentials/user-credential")
);

const UserCredentialsPage = async () => {
  const credentials = await getCredentialsForUser();

  if (!credentials) {
    return (
      <AlertError
        title="Error"
        description="Something went wrong, please try again later"
      />
    );
  }
  if (credentials.length === 0) {
    return (
      <UserDataNotFound
        icon={ShieldOffIcon}
        title="No credentials created yet"
        description="Click the button below to create your first credential"
      >
        <CreateCredentialDialog triggerText="Add your first credential" />
      </UserDataNotFound>
    );
  }
  return <LazyUserCredentials credentials={credentials} />;
};

export default UserCredentialsPage;
