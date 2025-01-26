import React from "react";
import { EXECUTION_TABLE_HEADERS } from "../constants";
import {
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";

const ExecutionTableHeader = () => {
  return (
    <TableHeader className="bg-muted">
      <TableRow>
        {EXECUTION_TABLE_HEADERS.map((header, index) => {
          return <TableHead key={index}>{header}</TableHead>;
        })}
      </TableRow>
    </TableHeader>
  );
};

export default ExecutionTableHeader;
