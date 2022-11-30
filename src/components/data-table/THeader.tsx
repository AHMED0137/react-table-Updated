import { Id, WithStatus } from "./types";
import { Table, flexRender } from "@tanstack/react-table";

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface THeaderProps<TData extends { id: string | number }> {
  table: Table<WithStatus<TData>>;
  headerStyleClasses?: {
    trClassName?: React.HtmlHTMLAttributes<"tr">["className"];
    thClassName?: React.HtmlHTMLAttributes<"th">["className"];
  };
}

export function THeader<TData extends { id: Id }>({
  table,
  headerStyleClasses,
}: THeaderProps<TData>) {
  const { trClassName, thClassName } = headerStyleClasses || {};
  const header = table.getHeaderGroups();
  return (
    <thead>
      {header.map((headerGroup) => (
        <tr key={headerGroup.id} className={trClassName}>
          {headerGroup.headers.map((header) => (
            <th
              scope="col"
              className={thClassName}
              key={header.id}
              colSpan={header.colSpan}
              style={{ position: "relative", width: `${header.getSize()}%` }}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
