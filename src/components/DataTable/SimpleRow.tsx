import { useEffect, useState } from "react";
import { Action, ActionIcons } from "./ActionIcons";

import { CellContext } from "@tanstack/react-table";
import { Id } from "../data-table";
import { User } from "./DataTable2";
import { RowFormWithDrawer } from "./EditRow";

export function SimpleRow(props: CellContext<User, unknown>) {
  const { getValue, table, row, cell } = props;
  const initialValue = row.original;
  const [value, setValue] = useState(initialValue);

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<Action>("new");

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function handleAction(rowId: Id, action: Action) {
    setAction(action);
    if (action === "delete") {
      table.options.meta?.deleteRow(rowId);
    } else if (action === "edit") {
      setOpen(true);
    } else if (action === "copy") {
      table.options.meta?.copyRow(rowId);
    }
  }

  switch (props.cell.column.id) {
    case "Action":
      return (
        <div className="grid place-items-start">
          <ActionIcons onClick={handleAction} rowId={row.original.id} />
          <RowFormWithDrawer
            {...props}
            opened={open}
            action={action}
            size="60%"
            onClose={() => setOpen(false)}
          />
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
