import { Paper, Text } from '@mantine/core';
import { flexRender } from '@tanstack/react-table';
import { Only } from './Only';
import { TableUIProps } from './TableUI';
import { Id } from './types';

export function TableCard<T extends { id: Id }>({
  table,
  className,
  headerStyleClasses,
  bodyStyleClasses,
  footerStyleClasses,
  footer,
  pagination,
}: TableUIProps<T>) {
  return (
    <div className="space-y-4">
      {table.getRowModel().rows.map((row) => (
        <Paper shadow={'lg'} pt={0} pl={0} pr={0} m={0}>
          <div key={row.original.id} className="grid">
          <div className="flex flex-row w-full bg-slate-100 p-4">{row.original.id}</div>
            <div key={row.original.id} className="grid grid-cols-4">
            {row.getVisibleCells().map((cell, index) => (
              <>
              <Only when={index > 0} key={cell.id + cell.row.id}>
                <div className="flex flex-col p-4 space-y-4" key={cell.id + cell.row.id}>
                  <span className="text-left text-sm font-semibold text-gray-400">
                    <Text size="sm">{`${cell.column.columnDef.id ?? cell.column.columnDef.header} `}</Text>
                  </span>

                  <span className="text-ellipsis text-left text-sm text-gray-400">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </span>
                </div>
              </Only>
              </>
            ))}
          </div>
          </div>
        </Paper>
      ))}
    </div>
  );
}
