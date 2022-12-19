import { ColumnDef } from "@tanstack/react-table";
import { MainData } from "./Datatable";
import { NumberFormet } from "./NumberFormet";

 const SumNumber=(array: any[], value:any)=>{
      let sum=0;
       array.map((item)=>{
           return sum+=Number(item.original[value]);
       })
       return sum;
 }
// https://tanstack.com/table/v8/docs/guide/introduction

export const getColumns = () => {
  const columns: Array<ColumnDef<MainData, unknown>> = [
    // {
    //   accessorKey: "id",
    //   header: "ID",
    //   footer: () => null,
    //   maxSize: 5,
    // },
    {
      accessorKey:"sport_discipline_id",
      header:"Sport Discipline Id",
      footer: () => null,
      maxSize: 15,
    },
    {
      accessorKey: "program",
      header: "Program",
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
        const sum=SumNumber(rows,"funding_nso")
        // rows.map((item)=>{
        //   return sum+=Number(item.original.funding_nso);
        // })
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
        const sum=SumNumber(rows,"funding_other");
       return NumberFormet(sum);
      },
      size: 5,
    },

    {
      accessorKey: "funding_total",
      header: "Total",
      accessorFn: row=>NumberFormet(row.funding_total),
      footer: ({table}) => {
        const rows=table.getRowModel().rows;
        const sum=SumNumber(rows,"funding_total");
          //  let intialValues=0;
        //  sum = rows.reduce((partialSum, a) => partialSum + Number(a), intialValues);
        return NumberFormet(sum);
      },
      size: 5,
    },
  ];

  return columns;
};
