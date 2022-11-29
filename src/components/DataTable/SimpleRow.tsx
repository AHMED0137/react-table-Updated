import { useEffect, useState } from "react";

import { CellContext } from "@tanstack/react-table";
import { isTableRowInEditMode } from "../data-table";
import { ControlActions } from "./ActionButtons";
import { User } from "./DataTable2";
import { RowFormWithDrawer } from "./EditRow";

export function SimpleRow(props: CellContext<User, unknown>) {
  const { getValue, table, row, cell } = props;

  const initialValue = row.original;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const isEditting = isTableRowInEditMode(
    table.options.meta?.getState()!,
    row.original.id
  );

  //   const onBlur = () => {
  //     table.options.meta?.updateData(row.original.id, cell.column.id, value);
  //   };

  switch (props.cell.column.id) {
    case "Action":
      return (
        <div className="grid place-items-start">
          <RowFormWithDrawer
            opened={isEditting}
            onClose={() => table.options.meta?.cancelEdit(row.original.id)}
            {...props}
          />
          <ControlActions {...props} />
        </div>
      );

    default:
      return (
        <div className="grid place-items-start">
          {cell.getValue() as string}
        </div>
      );
  }
}
