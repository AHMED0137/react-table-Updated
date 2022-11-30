import { RowData } from "@tanstack/react-table";

type Id = string | number;

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    deleteRow: (rowId: Id) => void;
    updateRow: (rowId: Id, row: TData) => void;
    addRow: (row: TData, rowId: Id) => void;
  }
}

type Status = "initial" | "new" | "changed" | "deleted";
type WithStatus<T> = T & { status: Status };

export type { Id, Status, WithStatus };
