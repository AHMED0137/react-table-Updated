/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable- react-hooks/exhaustive-deps
import {
  CellContext,
  ColumnDef,
  OnChangeFn,
  RowSelectionState,
  Table,
} from "@tanstack/react-table";
import { Id, WithStatus } from "./types";
import React, { useState } from "react";
import {
  addTableRow,
  copyTableRow,
  deleteTableRow,
  editTableRow,
  getTableDataWithStatus,
} from "./tableUtils";

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

export function useDataTable<T extends { id: Id }>({
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
}: DataTableProps<T>): [Table<WithStatus<T>>, () => JSX.Element] {
  //

  const [data, setTableData] = useState<Array<WithStatus<T>>>(
    getTableDataWithStatus(initialTableData)
  );

  // delete row with a given rowId
  function deleteRow(rowId: Id) {
    setTableData(deleteTableRow(data, rowId));
    if (onRowDelete) onRowDelete(rowId);
  }

  function addRow(row: T) {
    setTableData(addTableRow(data, row));
    if (onRowUpdate) onRowUpdate(row);
  }

  function copyRow(rowId: Id) {
    setTableData(copyTableRow(data, rowId));
  }

  function editRow(row: T) {
    setTableData(editTableRow(data, row));
  }

  function resetTable() {
    setTableData(getTableDataWithStatus(initialTableData));
  }

  function getTableChanges() {
    return data.filter((row) => row.status !== "initial");
  }

  const table = useTable<WithStatus<T>>({
    data: data.filter((d) => d.status !== "deleted"),
    columns,
    RowUI,
    pagination,
    search,
    onRowsSelected,
    rowsSelected,
    meta: {
      deleteRow,
      editRow,
      addRow,
      copyRow,
      resetTable,
      getTableChanges,
    },
  });

  console.log(data);

  const render = () => {
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
  };

  return [table, render];
}

export default useDataTable;
