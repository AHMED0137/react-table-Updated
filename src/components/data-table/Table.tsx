/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable- react-hooks/exhaustive-deps

import {
  CellContext,
  ColumnDef,
  OnChangeFn,
  RowSelectionState,
} from '@tanstack/react-table';
import { Id, RowState, TableData } from './types';
import React, { useEffect, useState } from 'react';
import { deleteTableRow, updateTableRow } from './tableUtils';

import { TBodyProps } from './TBody';
import { TFooterProps } from './TFooter';
import { THeaderProps } from './THeader';
import { TableUI } from './TableUI';
import { useTable } from './useTable';

export type DataTableProps<T extends { id: Id }> = {
  data: Array<T>;
  columns: Array<ColumnDef<T, unknown>>;
  search?: string;
  footer?: boolean;
  pagination?: boolean;
  RowUI?: React.JSXElementConstructor<CellContext<T, unknown>>;
  onRowUpdate?: (rows: RowState<T>[]) => void;
  onRowDelete?: (rowId: string | number) => void;
  rowsSelected?: RowSelectionState;
  onRowsSelected?: OnChangeFn<RowSelectionState>;
  className?: string;
  bodyStyleClasses?: TBodyProps<T>['bodyStyleClasses'];
  footerStyleClasses?: TFooterProps<T>['footerStyleClasses'];
  headerStyleClasses?: THeaderProps<T>['headerStyleClasses'];
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
  const [tableData, setTableData] = useState<TableData<T>>({
    data: initialTableData,
    changedRows: [],
  });

  // update the table internal state when data from outside changes
  useEffect(() => {
    setTableData((old) => ({
      ...old,
      data: initialTableData,
    }));
  }, [initialTableData]);

  // fire onRowUpdate event when changedRows gets updated.
  useEffect(() => {
    if (onRowUpdate) {
      onRowUpdate(
        tableData.changedRows.filter((item) => item.isChanged === true)
      );
    }
  }, [tableData]);

  // delete row with a given index
  const deleteRow = (rowId: Id) => {
    console.log(rowId);
    if (onRowDelete) onRowDelete(rowId);
    setTableData(deleteTableRow(tableData, rowId));
  };

  // editRow
  const updateRow = (rowId: Id, row: T) => {
    setTableData(updateTableRow(tableData, rowId, row));
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
      deleteRow,
      updateRow,
      getState: () => tableData,
      setState: setTableData,
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
