import { Id, RowState, TableData } from "./types";

import { isEmpty } from "lodash";

export function isRowChanged<T extends { id: Id }>(
  orignalRow: T,
  changedRow: T
) {
  if (isEmpty(changedRow)) return false;
  const rowId = orignalRow.id;

  let rowInLS = localStorage.getItem(rowId.toString());
  if (!rowInLS) {
    localStorage.setItem(
      changedRow["id" as keyof T] as string,
      JSON.stringify(orignalRow)
    );
  }

  const rowFrmLS = JSON.parse(localStorage.getItem(rowId.toString()) as string);
  const equalance = Object.keys(changedRow).map((key) => {
    return (
      (changedRow[key as keyof T] as any).toString() ===
      (rowFrmLS[key as keyof T] as any).toString()
    );
  });
  return !equalance.every((value) => value === true);
}

export function updateTableRow<T extends { id: Id }>(
  tableData: TableData<T>,
  rowId: Id,
  columnId: string,
  value: unknown
) {
  const rowIndex = tableData.data.findIndex((item) => item.id === rowId);

  let tableRow = tableData.data[rowIndex];
  tableRow = { ...tableRow, [columnId]: value };

  let changedRows = [...tableData.changedRows];
  const changedRowIndex = changedRows.findIndex((row) => row.rowId === rowId);

  const data = [...tableData.data];

  const hasRowChanged = isRowChanged(data[rowIndex], tableRow);

  let changedRow: RowState<T> = {
    isEditing: true,
    isChanged: hasRowChanged,
    rowId: rowId,
    updatedRow: tableRow,
  };
  data[rowIndex] = tableRow;
  changedRow.updatedRow = tableRow;
  if (changedRowIndex >= 0) changedRows[changedRowIndex] = changedRow;
  else changedRows.push(changedRow);

  return { data, changedRows };
}

// checks if the row with given index is in edit mode
export function isTableRowInEditMode<T extends { id: Id }>(
  tableData: TableData<T>,
  rowId: Id
) {
  const { changedRows } = tableData;
  const index = changedRows.findIndex(
    (changedRow) => changedRow.rowId === rowId
  );
  return index >= 0 && !!changedRows[index].isEditing;
}

export function setTableRowInEditMode<T extends { id: Id }>(
  tableData: TableData<T>,
  rowId: Id,
  mode: boolean
) {
  let { changedRows } = tableData;
  let data = [...tableData.data];
  const changedRowIndex = changedRows.findIndex((row) => row.rowId === rowId);

  const dataIndex = data.findIndex((item) => item.id === rowId);

  let changedRow: RowState<T> = {
    isEditing: mode,
    isChanged: isRowChanged(data[dataIndex], tableData.data[dataIndex]),
    rowId: rowId,
    updatedRow: tableData.data[dataIndex],
  };

  if (changedRowIndex >= 0) changedRows[changedRowIndex] = changedRow;
  else changedRows.push(changedRow);

  return { data, changedRows };
}

export function copyTableRow<T extends { id: Id }>(
  tableData: TableData<T>,
  rowId: Id
) {
  localStorage.getItem(rowId.toString());
  return {
    data: tableData.data.filter((item) => item.id !== rowId),
    changedRows:
      tableData.changedRows.filter((item) => item.updatedRow?.id !== rowId) ??
      [],
  };
}



export function deleteTableRow<T extends { id: Id }>(
  tableData: TableData<T>,
  rowId: Id
) {
  localStorage.removeItem(rowId.toString());
  return {
    data: tableData.data.filter((item) => item.id !== rowId),
    changedRows:
      tableData.changedRows.filter((item) => item.updatedRow?.id !== rowId) ??
      [],
  };
}

// cancelEditting cell within a given row
export function cancelRowEdit<T extends { id: Id }>(
  tableData: TableData<T>,
  rowId: Id
) {
  // check if orignalRow is in localStorage
  const rowIndex = tableData.data.findIndex((item) => item.id === rowId);
  const rowFromLS = localStorage.getItem(rowId.toString());

  if (!rowFromLS) {
    return setTableRowInEditMode(tableData, rowId, false);
  }

  const rowFrmLS = JSON.parse(rowFromLS) as T;

  const data = [...tableData.data];
  data[rowIndex] = rowFrmLS;

  const changedRows =
    tableData.changedRows.filter((item) => item.updatedRow?.id !== rowId) ?? [];

  return { data, changedRows };
}
