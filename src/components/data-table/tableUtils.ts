import { Id, Status, WithStatus } from "./types";

export function getTableDataWithStatus<T>(
  data: Array<T>
): Array<WithStatus<T>> {
  return data.map((row) => ({
    ...row,
    status: "initial",
  }));
}

function addStatus<T extends { id: Id }>(row: T, status: Status) {
  return { ...row, status };
}

export function deleteTableRow<T extends { id: Id }>(
  data: Array<WithStatus<T>>,
  rowId: Id
) {
  const ndata = [...data];

  const rowIndex = data.findIndex((r) => r.id === rowId);

  // no change
  if (rowIndex === -1) return data;

  const row = ndata[rowIndex];

  //if the row was newly added but now being delete therefore remove it from the data
  if (row.status === "new") {
    ndata.splice(rowIndex, 1);
    return ndata;
  }

  const newData = ndata.map((row) => {
    const index = ndata.findIndex(
      (row) => row.id === rowId && row.status !== "deleted"
    );
    if (index < 0) return row;
    ndata[index].status = "deleted";
    return row;
  });
  return newData;
}

export function addTableRow<T extends { id: Id }>(
  data: Array<WithStatus<T>>,
  row: T
) {
  const rowWithStatus = addStatus(row, "new");
  const ndata = [...data];
  ndata.push(rowWithStatus);
  return ndata;
}

export function copyTableRow<T extends { id: Id }>(
  data: Array<WithStatus<T>>,
  rowId: Id
) {
  const index = data.findIndex((r) => r.id === rowId);
  if (index < 0) return data;
  const newData = [...data];
  const rowWithStatus = addStatus(data[index], "new");
  rowWithStatus.id = Date.now();
  newData.splice(index + 1, 0, rowWithStatus);
  return newData;
}

export function editTableRow<T extends { id: Id }>(
  data: Array<WithStatus<T>>,
  row: T
) {
  const index = data.findIndex((r) => r.id === row.id);
  const rowWithStatus = addStatus(row, "changed");
  if (index < 0) return data;
  const newData = [...data];
  newData[index] = rowWithStatus;
  return newData;
}
