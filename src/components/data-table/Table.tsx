/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable- react-hooks/exhaustive-deps

import {
  CellContext,
  ColumnDef,
  OnChangeFn,
  RowSelectionState
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import {
  cancelRowEdit, copyTableRow, deleteTableRow,
  isTableRowInEditMode,
  setTableRowInEditMode,
  updateTableRow
} from "./tableUtils";
import { Id, RowState, TableData } from "./types";

import { differenceWith } from "lodash";
import { TableUI } from "./TableUI";
import { TBodyProps } from "./TBody";
import { TFooterProps } from "./TFooter";
import { THeaderProps } from "./THeader";
import { useTable } from "./useTable";

export type DataTableProps<T extends { id: Id }> = {
  data: Array<T>;
  columns: Array<ColumnDef<T, unknown>>;
  search?: string;
  footer?: boolean;
  pagination?: boolean;
  RowUI?: React.JSXElementConstructor<CellContext<T, unknown>>;
  onRowUpdate?: (rows: RowState<T>[]) => void;
  onRowDelete?: (rowId: string | number) => void;
  onRowCopy ?: (rowId: string | number) => void;
  rowsSelected?: RowSelectionState;
  onRowsSelected?: OnChangeFn<RowSelectionState>;
  className?: string;
  bodyStyleClasses?: TBodyProps<T>["bodyStyleClasses"];
  footerStyleClasses?: TFooterProps<T>["footerStyleClasses"];
  headerStyleClasses?: THeaderProps<T>["headerStyleClasses"];
};

function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;
  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });
  return [shouldSkip, skip] as const;
}

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
  onRowCopy,
  headerStyleClasses,
  bodyStyleClasses,
  footerStyleClasses,
  rowsSelected,
  onRowsSelected,
}: DataTableProps<T>) {
  const [tableData, setTableData] = useState<TableData<T>>({
    data: initialTableData,
    changedRows: [],
  });

  const [, skipAutoResetPageIndex] = useSkipper();

  // fire onRowUpdate event when changedRows gets updated.
  useEffect(() => {
    if (onRowUpdate) {
      onRowUpdate(
        tableData.changedRows.filter(
          (item) => item.isChanged === true && item.isEditing === false
        )
      );
    }
  }, [tableData]);

  useEffect(() => {
    const newRow = differenceWith(
      initialTableData,
      tableData.data,
      (a, b) => a.id === b.id
    );

    if (newRow.length > 0) {
      const data = [...newRow, ...tableData.data];
      const changedRow: RowState<T> = {
        rowId: newRow[0].id,
        isChanged: false,
        isEditing: true,
        updatedRow: { ...newRow[0] },
      };
      setTableData((old) => {
        return {
          data,
          changedRows: [...old.changedRows, changedRow],
        };
      });
    }
  }, [initialTableData]);

  // update table row
  const updateRow = (rowId: Id, columnId: string, value: unknown) => {
    skipAutoResetPageIndex();
    setTableData(updateTableRow(tableData, rowId, columnId, value));
  };

  const isRowEditting = (rowId: Id) => {
    return isTableRowInEditMode(tableData, rowId);
  };

  // sets the given row in edit mode
  const setRowEditing = (rowId: Id, mode: boolean) => {
    setTableData(setTableRowInEditMode(tableData, rowId, mode));
  };

// delete row with a given index
  const copyRow = (rowId: Id) => {
    if (onRowCopy) onRowCopy(rowId);
    setTableData(copyTableRow(tableData, rowId));
  };

  // delete row with a given index
  const deleteRow = (rowId: Id) => {
    if (onRowDelete) onRowDelete(rowId);
    setTableData(deleteTableRow(tableData, rowId));
  };

  // cancelEditting cell within a given row
  const cancelEdit = (rowId: Id) => {
    setTableData(cancelRowEdit(tableData, rowId));
  };

  const table = useTable({
    data: tableData.data,
    columns: columns,
    RowUI,
    pagination,
    search,

    onRowsSelected,
    rowsSelected,

    meta: {
      updateData: updateRow,
      isRowEditting,
      copyRow,
      setRowEditing,
      deleteRow,
      cancelEdit,
      setState: setTableData,
      getState: () => tableData,
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
