import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import React, { useState } from "react";
import { useDataTable } from "../data-table";
import { SimpleRow } from "./SimpleRow";
import { getColumns } from "./TableSchema";

/* eslint-disable react-hooks/exhaustive-deps */
export type MainData = {
  id: number | string;
  sport_discipline_id: number | string,
  program:string;
  funding_otp: number;
  funding_sportsCanada: number;
  funding_nso: number;
  funding_other: number;
  funding_total: number; // calculate
};

interface TableProps {
  tableData: Array<MainData>;
}

// style classes for table
const headerStyleClasses = {
  trClassName: "text-gray-500 bg-orange-200",
  thClassName:
    "border-0 border-b-2 border-l-2 border-solid border-slate-100 py-2 px-2 text-left text-xs ",
};
const bodyStyleClasses = {
  tdClassName: "text-xs p-2",
  trClassName: "even:bg-slate-100 text-left text-slate-600 text-xs",
};
const footerStyleClasses = {
  thClassName: "text-gray-500 bg-gray-200 p-2 ",
  trClassName: "even:bg-slate-100 p-4 m-4 text-left text-slate-500 text-xs",
};

export function SummeryTable({ tableData }: TableProps) {
  const [search, setSearchText] = useState<string>();
  const [data, setData] = useState<Array<MainData>>(tableData);
  // console.log(data,"my data");
  const [table, renderTable] = useDataTable({
    data: data,
    columns: getColumns(),
    RowUI: SimpleRow,
    search: search,
    className: "bottom-2 w-full table-fixed border-collapse",
    bodyStyleClasses: bodyStyleClasses,
    headerStyleClasses: headerStyleClasses,
    footerStyleClasses:footerStyleClasses,
  });

  return (
   <div className="p-2">
      <div className="flex flex-row items-center space-x-9">
        <Input
          icon={<IconSearch />}
          placeholder="type to search any column"
          className="mb-4 mt-4 w-[60%]"
          color="orange"
          size="xs"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.currentTarget.value)
          }
        />   
      </div>
      <div className="overflow-auto bg-slate-50">
        {renderTable()}
      </div>
    </div>
  );
}
