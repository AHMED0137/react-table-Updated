import { RowData } from "@tanstack/react-table";
type Id = string | number;
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    deleteRow: (rowId: Id) => void;
    addRow: (row: TData) => void;
    copyRow: (rowId: Id) => void;
    editRow: (row: TData) => void;
    getTableChanges: () => Array<WithStatus<TData>>;
    resetTable: () => void;
  }
}

type Status = "initial" | "new" | "changed" | "deleted";
type WithStatus<T> = T & { status?: Status };

export type { Id, Status, WithStatus };

