import { Button, Input, Text } from "@mantine/core";
import { IconPlus, IconRefresh, IconSearch } from "@tabler/icons";
import React, { useState } from "react";
import { useDataTable } from "../data-table";
import { RowFormWithDrawer } from "./EditRow";
import { SimpleRow } from "./SimpleRow";
import { getColumns } from "./TableSchema";

/* eslint-disable react-hooks/exhaustive-deps */
export type User = {
  id: number | string;
  program_description?: string; //drop down
  sport_discipline_id:string,
  comments: string,

  first_name: string; // drop down
  last_name: string; // drop down
  name: string; // full name
  email: string; //  automatically
  position: string; // automatically

  psri_service: string;
  time_request: string;
  time_request_days: number;

  funding_otp: number;
  funding_sportsCanada: number;
  funding_nso: number;
  funding_other: number;
  funding_total: number; // calculate

  percent_aloc_senior: number; // 0 - 100
  percent_next_gen: number; // 0 - 100
  // percentage?:number;
};

interface TableProps {
  tableData: Array<User>;
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

export function Table({ tableData }: TableProps) {
  const [search, setSearchText] = useState<string>();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Array<User>>(tableData);
  const [selectedRows, setSelectedRows] = useState({});
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
    rowsSelected: selectedRows,
    onRowsSelected: setSelectedRows,
  });

  function handleReset() {
    table.options.meta?.resetTable();
  }

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
        <Button
          leftIcon={<IconPlus  size={14} stroke={6} />}
          size="xs"
          onClick={() => setOpen(true)}
          color="orange"
        >
          Add New Row
        </Button>
        <RowFormWithDrawer
          table={table}
          opened={open}
          size="60%"
          action="new"
          onClose={() => setOpen(false)}
        />
        <Button
          leftIcon={<IconRefresh size={14} stroke={6} />}
          size="xs"
          onClick={handleReset}
          color="orange"
        >
          Reset
        </Button>
      </div>
      <div className="overflow-auto bg-slate-50">
        {renderTable()}
        <Text size={"lg"} mt={"xl"} color={"orange"} mb={"lg"}>
          Displaying Changes in the datatable
        </Text>
        {JSON.stringify(table.options.meta?.getTableChanges())}
      </div>
    </div>
  );
}
