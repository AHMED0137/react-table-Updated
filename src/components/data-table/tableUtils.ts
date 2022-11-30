import { Id, WithStatus } from "./types";

function getTableDataWithStatus<T>(data: Array<T>): Array<WithStatus<T>> {
  return data.map((row) => ({
    ...row,
    status: "initial",
  }));
}

function refreshTableDataWithStatus<T>(data: Array<WithStatus<T>>) {
  return data.map((row) => ({
    ...row,
    status: row.status || "new",
  }));
}

function deleteTableRow<T extends { id: Id }>(
  data: Array<WithStatus<T>>,
  rowId: Id
) {
  const ndata = [...data];
  const index = ndata.findIndex((row) => row.id === rowId);
  if (index === -1) {
    return data;
  }
  ndata[index].status = "deleted";
  return ndata;
}

export { getTableDataWithStatus, refreshTableDataWithStatus, deleteTableRow };
