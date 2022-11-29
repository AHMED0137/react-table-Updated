import { Id, RowState, TableData } from './types';

export function deleteTableRow<T extends { id: Id }>(
  tableData: TableData<T>,
  rowId: Id
) {
  return {
    data: tableData.data.filter((item) => item.id !== rowId),
    changedRows:
      tableData.changedRows.filter((item) => item.updatedRow?.id !== rowId) ??
      [],
  };
}

export function updateTableRow<T extends { id: Id }>(
  tableData: TableData<T>,
  rowId: Id,
  row: T
) {
  const rIndex = tableData.data.findIndex((row) => row.id === rowId);
  const changedRowIndex = tableData.changedRows.findIndex(
    (row) => row.rowId === rowId
  );
  const ndata = [...tableData.data];
  const nChangedRows = [...tableData.changedRows];
  ndata[rIndex] = row;
  const changedRow: RowState<T> = {
    isChanged: true,
    rowId: rowId,
    updatedRow: row,
  };
  if (changedRowIndex < 0) nChangedRows.push(changedRow);
  else nChangedRows[changedRowIndex] = changedRow;

  return { changedRows: nChangedRows, data: ndata };
}
