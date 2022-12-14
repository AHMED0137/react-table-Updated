import { TBody, TBodyProps } from "./TBody";
import { TFooter, TFooterProps } from "./TFooter";
import { THeader, THeaderProps } from "./THeader";

import { Paper } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Table } from "@tanstack/react-table";
import { TableCard } from "./Card";
import TPagination from "./TPagination";
import { WithStatus } from "./types";

type Id = string | number;

export type TableUIProps<T extends { id: Id }> = {
  table: Table<WithStatus<T>>;
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

  return largeScreen ? (
    <Paper shadow={"sm"} radius="md" className="overflow-hidden">
      <table className={className ?? "w-full border-collapse overflow-hidden"}>
        <THeader table={table} headerStyleClasses={headerStyleClasses} />
        <TBody table={table} bodyStyleClasses={bodyStyleClasses} />
        {footer && (
          <TFooter
            table={table}
            message=""
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
    <TableCard table={table} />
  );
}
