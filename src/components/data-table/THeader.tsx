import { HeaderGroup, flexRender } from '@tanstack/react-table';

import { Id } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface THeaderProps<TData extends { id: string | number }> {
  header: HeaderGroup<TData>[];
  headerStyleClasses?: {
    trClassName?: React.HtmlHTMLAttributes<'tr'>['className'];
    thClassName?: React.HtmlHTMLAttributes<'th'>['className'];
  };
}

export function THeader<TData extends { id: Id }>({
  header,
  headerStyleClasses,
}: THeaderProps<TData>) {
  const { trClassName, thClassName } = headerStyleClasses || {};

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
              style={{ position: 'relative', width: `${header.getSize()}%` }}
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
