/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable- react-hooks/exhaustive-deps

import {
  CellContext,
  ColumnDef,
  OnChangeFn,
  RowSelectionState,
} from "@tanstack/react-table";
import { Id, WithStatus } from "./types";
import React, { useState } from "react";
import { deleteTableRow, getTableDataWithStatus } from "./tableUtils";

import { TBodyProps } from "./TBody";
import { TFooterProps } from "./TFooter";
import { THeaderProps } from "./THeader";
import { TableUI } from "./TableUI";
import { useTable } from "./useTable";

export type DataTableProps<T extends { id: Id }> = {
  data: Array<T>;
  columns: Array<ColumnDef<T, unknown>>;

  RowUI?: React.JSXElementConstructor<CellContext<T, unknown>>;

  onRowUpdate?: (rows: any) => void;
  onRowDelete?: (rowId: string | number) => void;

  rowsSelected?: RowSelectionState;
  onRowsSelected?: OnChangeFn<RowSelectionState>;

  search?: string;
  footer?: boolean;
  pagination?: boolean;

  className?: string;
  bodyStyleClasses?: TBodyProps<T>["bodyStyleClasses"];
  footerStyleClasses?: TFooterProps<T>["footerStyleClasses"];
  headerStyleClasses?: THeaderProps<T>["headerStyleClasses"];
};

export function DataTable<T extends { id: Id }>({
  data: initialTableData,
  columns,
  search,
  className,
  footer = false,
  pagination = false,
  RowUI,
  onRowUpdate,
  onRowDelete,
  headerStyleClasses,
  bodyStyleClasses,
  footerStyleClasses,
  rowsSelected,
  onRowsSelected,
}: DataTableProps<T>) {
  //

  console.log(initialTableData);

  const [data, setTableData] = useState<Array<WithStatus<T>>>(
    getTableDataWithStatus(initialTableData)
  );

  console.log(data);

  // delete row with a given rowId
  function deleteRow(rowId: Id) {
    setTableData(deleteTableRow(data, rowId));
    if (onRowDelete) onRowDelete(rowId);
  }

  // editRow
  const updateRow = (rowId: Id, row: T) => {};

  const table = useTable({
    data: data.filter((d) => d.status !== "deleted"),
    columns,
    RowUI,
    pagination,
    search,
    onRowsSelected,
    rowsSelected,

    meta: {
      deleteRow,
      updateRow,
      addRow: () => {},
    },
  });

  return (
    <TableUI
      table={table}
      pagination={pagination}
      footer={footer}
      headerStyleClasses={headerStyleClasses}
      bodyStyleClasses={bodyStyleClasses}
      footerStyleClasses={footerStyleClasses}
      className={className}
    />
  );
}

export default DataTable;
