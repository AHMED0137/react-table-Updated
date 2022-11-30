import { Id, WithStatus } from "./types";
import { Table, flexRender } from "@tanstack/react-table";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TBodyProps<TData extends { id: Id }> {
  table: Table<WithStatus<TData>>;
  bodyStyleClasses?: {
    trClassName?: React.HtmlHTMLAttributes<"tr">["className"];
    tdClassName?: React.HtmlHTMLAttributes<"td">["className"];
  };
}

export function TBody<TData extends { id: Id }>({
  table,
  bodyStyleClasses,
}: TBodyProps<TData>) {
  const { tdClassName, trClassName } = bodyStyleClasses || {};
  const rows = table.getRowModel().rows;
  console.log(rows);
  return (
    <tbody>
      {rows.map((row) => (
        <tr
          key={row.id}
          className={
            trClassName +
              (row.original.status !== "initial"
                ? " bg-orange-100 even:bg-orange-100"
                : "") ??
            "border-0 border-b-2 border-solid border-slate-200 even:bg-slate-100"
          }
        >
          {row.getVisibleCells().map((cell) => (
            <td
              className={tdClassName ?? "p-2"}
              key={cell.id}
              style={{
                width: `${cell.column.getSize()}%`,
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
