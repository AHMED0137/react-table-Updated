import { Action, ActionIcons } from "./ActionIcons";
import { useEffect, useState } from "react";

import { CellContext } from "@tanstack/react-table";
import { Id } from "../data-table";
import { User } from "./DataTable2";

export function SimpleRow(props: CellContext<User, unknown>) {
  const { getValue, table, row, cell } = props;
  const initialValue = row.original;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function handleAction(rowId: Id, action: Action) {
    if (action === "delete") {
      table.options.meta?.deleteRow(rowId);
    }
  }

  switch (props.cell.column.id) {
    case "Action":
      return (
        <div className="grid place-items-start">
          <ActionIcons onClick={handleAction} rowId={row.original.id} />
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
