import { Button, Input, Text } from "@mantine/core";
import { IconRefresh, IconSearch, IconTextPlus } from "@tabler/icons";
import React, { useState } from "react";

import { RowFormWithDrawer } from "./EditRow";
import { SimpleRow } from "./SimpleRow";
import { getColumns } from "./TableSchema";
import { useDataTable } from "../data-table";

/* eslint-disable react-hooks/exhaustive-deps */

export type User = {
  id: number | string;
  description: string;
  notes: string;
  otp: string;
  sportsCanada: string;
  nso: string;
  otherSources: string;
  total: string;
};

interface TableProps {
  tableData: Array<User>;
}

const headerStyleClasses = {
  trClassName: "text-gray-500 bg-orange-200",
  thClassName:
    "border-0 border-b-2 border-l-2 border-solid border-slate-100 py-2 px-2 text-left text-xs ",
};
const bodyStyleClasses = {
  tdClassName: "text-xs p-2",
  trClassName: "even:bg-slate-100 text-left text-slate-600 text-xs",
};

export function Table({ tableData }: TableProps) {
  const [search, setSearchText] = useState<string>();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Array<User>>(tableData);
  const [selectedRows, setSelectedRows] = useState({});

  const [table, renderTable] = useDataTable({
    data: data,
    columns: getColumns(),
    RowUI: SimpleRow,
    search: search,
    className: "bottom-2 w-full table-fixed border-collapse",
    bodyStyleClasses: bodyStyleClasses,
    headerStyleClasses: headerStyleClasses,
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
          leftIcon={<IconTextPlus size={14} stroke={6} />}
          size="xs"
          onClick={() => setOpen(true)}
          color="orange"
        >
          Add New Row
        </Button>
        <RowFormWithDrawer
          table={table}
          opened={open}
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
