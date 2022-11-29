import { Checkbox } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "./DataTable2";

// https://tanstack.com/table/v8/docs/guide/introduction

export const getColumns = () => {
  const columns: Array<ColumnDef<User, unknown>> = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="grid place-items-center">
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            indeterminate={table.getIsSomeRowsSelected()}
            styles={{ input: { cursor: "pointer" } }}
          />
        </div>
      ),
      maxSize: 5,
    },
    {
      accessorKey: "description",
      header: "Descriptions",
      footer: () => null,
      maxSize: 15,
    },
    {
      accessorKey: "notes",
      header: "Notes",
      footer: () => null,
      maxSize: 15,
    },
    {
      accessorKey: "otp",
      header: "OTP",
      footer: () => null,
      maxSize: 10,
    },
    {
      accessorKey: "sportsCanada",
      header: "Sports Canada",
      footer: () => null,
      size: 5,
    },
    {
      accessorKey: "nso",
      header: "NSO",
      footer: () => null,
      size: 5,
    },
    {
      accessorKey: "otherSources",
      header: "Other",
      footer: () => null,
      size: 5,
    },

    {
      accessorKey: "total",
      header: "total",
      footer: () => null,
      size: 5,
    },
    {
      header: "Action",
      size: 20,
    },
  ];

  return columns;
};
