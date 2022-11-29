import { RowData } from '@tanstack/react-table';

export type Id = string | number;
export type Status = 'deleted' | 'updated' | 'new';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    getState: () => TableData<TData>;
    setState: React.Dispatch<React.SetStateAction<TableData<TData>>>;
    deleteRow: (rowId: Id) => void;
    updateRow: (rowId: Id, row: TData) => void;
  }
}

export type RowState<T extends RowData> = {
  rowId?: Id;
  isChanged?: boolean;
  updatedRow?: T;
};

export type TableData<TData extends RowData> = {
  data: Array<TData>;
  changedRows: Array<RowState<TData>>;
};
