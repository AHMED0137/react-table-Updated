import { Checkbox } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "./DataTable2";
import { NumberFormet } from "./NumberFormet";


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
      footer: () =>null, 
    
      maxSize: 30,
    },
    {
      accessorKey: "comments",
      header: "Comments",
      footer: () => "Total",
      maxSize: 35,
    },
    {
      accessorKey: "funding_otp",
      header: "OTP",
      accessorFn: row=>NumberFormet(row.funding_otp),
      footer: ({table}) => {
        const rows=table.getRowModel().rows;
        let sum=0;
        rows.map((item)=>{
          return sum+=Number(item.original.funding_otp);
        })
      return NumberFormet(sum);
      },
      maxSize: 15,
    },
    {
      accessorKey: "funding_sportsCanada",
      header: "Sports Canada",
      accessorFn: row=>NumberFormet(row.funding_sportsCanada),
      footer: ({table}) => {
        const rows=table.getRowModel().rows;
        let sum=0;
        rows.map((item)=>{
          return sum+=Number(item.original.funding_sportsCanada);
        })
        return NumberFormet(sum);
      },
      size: 5,
    },
    {
      accessorKey: "funding_nso",
      header: "NSO",
      accessorFn: row=>NumberFormet(row.funding_nso),
      footer: ({table}) => { 
        const rows=table.getRowModel().rows;
        let sum=0;
        rows.map((item)=>{
          return sum+=Number(item.original.funding_nso);
        })
        return NumberFormet(sum);
      },
      size: 5,
    },
    {
      accessorKey: "funding_other",
      header: "Other",
      accessorFn: row=>NumberFormet(row.funding_other),
      footer: ({table}) => {
        const rows=table.getRowModel().rows;
        let sum=0;
        rows.map((item)=>{
          return sum+=Number(item.original.funding_other);
        })
       return NumberFormet(sum);
      },
      size: 5,
    },

    {
      accessorKey: "funding_total",
      header: "total",
      accessorFn: row=>NumberFormet(row.funding_total),
      footer: ({table}) => {
        const rows=table.getRowModel().rows;
        let sum=0;
        rows.map((item)=>{
          return sum+=Number(item.original.funding_total);
        })
        return NumberFormet(sum);
      },
      size: 5,
    },
    {
      header: "Action",
      minSize: 18,
      size: 5,
      maxSize: 20,
    },
  ];

  return columns;
};
