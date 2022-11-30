import { TBody, TBodyProps } from "./TBody";
import { TFooter, TFooterProps } from "./TFooter";
import { THeader, THeaderProps } from "./THeader";

import { Paper } from "@mantine/core";
import TPagination from "./TPagination";
import { Table } from "@tanstack/react-table";
import { TableAccordian } from "./table-accordian";
import { useMediaQuery } from "@mantine/hooks";

type Id = string | number;

export type TableUIProps<T extends { id: Id }> = {
  table: Table<T>;
  className?: string;
  bodyStyleClasses?: TBodyProps<T>["bodyStyleClasses"];
  footerStyleClasses?: TFooterProps<T>["footerStyleClasses"];
  headerStyleClasses?: THeaderProps<T>["headerStyleClasses"];
  footer?: boolean;
  pagination?: boolean;
};

// function useSkipper() {
//   const shouldSkipRef = useRef(true);
//   const shouldSkip = shouldSkipRef.current;
//   // Wrap a function with this to skip a pagination reset temporarily
//   const skip = useCallback(() => {
//     shouldSkipRef.current = false;
//   }, []);

//   useEffect(() => {
//     shouldSkipRef.current = true;
//   });
//   return [shouldSkip, skip] as const;
// }

export function TableUI<T extends { id: Id }>({
  table,
  className,
  headerStyleClasses,
  bodyStyleClasses,
  footerStyleClasses,
  footer,
  pagination,
}: TableUIProps<T>) {
  const largeScreen = useMediaQuery("(min-width: 900px)");
  // const [shouldSkip, skipAutoResetPageIndex] = useSkipper();

  // useEffect(() => {
  //   skipAutoResetPageIndex();
  // }, [table.getState().pagination.pageIndex]);

  return largeScreen ? (
    <Paper shadow={"sm"} radius="md" className="overflow-hidden">
      <table className={className ?? "w-full border-collapse overflow-hidden"}>
        <THeader
          header={table.getHeaderGroups()}
          headerStyleClasses={headerStyleClasses}
        />
        <TBody
          rows={table.getRowModel().rows}
          bodyStyleClasses={bodyStyleClasses}
        />
        {footer && (
          <TFooter
            footerHeader={table.getFooterGroups()}
            message={`Displaying ${
              table.getRowModel().rows.length
            } rows of rows`}
            footerStyleClasses={footerStyleClasses}
          />
        )}
      </table>

      {pagination && (
        <TPagination
          onChange={(page) => table.setPageIndex(page - 1)}
          onPageSizeChange={table.setPageSize}
          page={table.getState().pagination.pageIndex + 1}
          total={table.getPageCount()}
        />
      )}
    </Paper>
  ) : (
    <TableAccordian table={table} />
  );
}
