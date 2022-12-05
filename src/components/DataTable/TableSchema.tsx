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
      accessorKey: "program_description",
      header: "Descriptions",
      footer: ({table}) => {
        table.getColumn("program_description")
      }
      // {
      //   const total= React.useMemo(
            
      //   )
      // }
      ,
      maxSize: 30,
    },
    {
      accessorKey: "comments",
      header: "Comments",
      footer: () => null,
      maxSize: 35,
    },
    {
      accessorKey: "funding_otp",
      header: "OTP",
      footer: () => null,
      maxSize: 15,
    },
    {
      accessorKey: "funding_sportsCanada",
      header: "Sports Canada",
      footer: () => null,
      size: 5,
    },
    {
      accessorKey: "funding_nso",
      header: "NSO",
      footer: () => null,
      size: 5,
    },
    {
      accessorKey: "funding_other",
      header: "Other",
      footer: () => null,
      size: 5,
    },

    {
      accessorKey: "funding_total",
      header: "total",
      footer: () => null,
      size: 5,
    },
    {
      header: "Action",
      minSize: 12,
      size: 5,
      maxSize: 20,
    },
  ];

  return columns;
};
