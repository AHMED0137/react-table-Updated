import { Row, flexRender } from "@tanstack/react-table";

import { Button } from "@mantine/core";
import { Id } from "./types";
import { Plus } from "tabler-icons-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TBodyProps<TData extends { id: Id }> {
  rows: Row<TData>[];
  bodyStyleClasses?: {
    trClassName?: React.HtmlHTMLAttributes<"tr">["className"];
    tdClassName?: React.HtmlHTMLAttributes<"td">["className"];
  };
}

export function TBody<TData extends { id: Id }>({
  rows,
  bodyStyleClasses,
}: TBodyProps<TData>) {
  const { tdClassName, trClassName } = bodyStyleClasses || {};

  return (
    <tbody>
      <tr>
        <td colSpan={rows[0].getAllCells().length} className="bg-slate-50">
          <div className="mt-2 mb-2 flex w-full flex-row justify-end bg-slate-100 p-2">
            <Button leftIcon={<Plus />} size="xs">
              New
            </Button>
          </div>
        </td>
      </tr>
      {rows.map((row) => (
        <tr
          key={row.id}
          className={
            trClassName ??
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
