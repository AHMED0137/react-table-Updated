import { useEffect, useState } from "react";

import { ActionIcons } from "./ActionIcons";
import { CellContext } from "@tanstack/react-table";
import { User } from "./DataTable2";

export function SimpleRow(props: CellContext<User, unknown>) {
  const { getValue, table, row, cell } = props;

  const initialValue = row.original;

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  switch (props.cell.column.id) {
    case "Action":
      return (
        <div className="grid place-items-start">
          <ActionIcons />
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
