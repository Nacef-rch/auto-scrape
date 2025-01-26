import React, { useId } from "react";
//libs
import { useQuery } from "@tanstack/react-query";
//types
import { ParamProps } from "@/types/appNode";
//components
import { getCredentialsForUser } from "@/features/user-credentials/actions/getCredentialsForUser";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Label } from "@workspace/ui/components/label";

const CredentialsParam = ({
  param,
  value,
  updateNodeParamValue,
}: ParamProps) => {
  const id = useId();
  const query = useQuery({
    queryKey: ["credentials-for-user"],
    queryFn: () => getCredentialsForUser(),
    refetchInterval: 10000,
  });
  return (
    <div className="flex flex-col gap-1 w-full">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Select
        defaultValue={value}
        onValueChange={(value) => updateNodeParamValue(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Credentials</SelectLabel>
            {query.data?.map((credential) => {
              return (
                <SelectItem key={credential.id} value={credential.id}>
                  {credential.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CredentialsParam;
