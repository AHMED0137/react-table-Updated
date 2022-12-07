import { flexRender, Table } from "@tanstack/react-table";
import { Id, WithStatus } from "./types";

import React from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from "@mantine/core";

export interface TFooterProps<TData extends { id: Id }> {
  table: Table<WithStatus<TData>>;

  message?: string;
  footerStyleClasses?: {
    trClassName?: React.HtmlHTMLAttributes<"tr">["className"];
    thClassName?: React.HtmlHTMLAttributes<"th">["className"];
  };
}

export function TFooter<TData extends { id: Id }>({
  table,
  message,
  footerStyleClasses,
}: TFooterProps<TData>) {
  const { thClassName, trClassName } = footerStyleClasses || {};
  const footerHeader = table.getFooterGroups();
  return (
    <React.Fragment>
      <tfoot>
        {footerHeader.map((footerGroup) => (
          <tr key={footerGroup.id} className={trClassName}>
            {footerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={thClassName}
                style={{ width: `${header.column.getSize()}px` }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
      {message && <Text component="caption">{message}</Text>}
    </React.Fragment>
  );
}
