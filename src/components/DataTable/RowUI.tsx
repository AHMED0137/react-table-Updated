import { useEffect, useState } from "react";

import { CellContext } from "@tanstack/react-table";
import { Checkbox } from "@mantine/core";
import { ControlActions } from "./ActionButtons";
import { EditableField } from "./EditableField";
import { EditableSelect } from "./EditableSelect";
import { User } from "./DataTable2";
import { isTableRowInEditMode } from "../data-table";

export function RowUI(props: CellContext<User, unknown>) {
  const { getValue, table, row, cell } = props;

  const initialValue = getValue() as string | number;
  const [value, setValue] = useState<string | number>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const isEditting = isTableRowInEditMode(
    table.options.meta?.getState()!,
    row.original.id
  );

  const onBlur = () => {
    table.options.meta?.updateData(row.original.id, cell.column.id, value);
  };

  switch (props.cell.column.id) {
    case "description":
      return (
        <div className="grid place-items-start">
          <EditableSelect
            as={isEditting ? "editable" : "readonly"}
            searchable
            value={value.toString()}
            data={["Program1", "Program2", "Program3"]}
            onChange={(value) => setValue(value ?? "")}
            onBlur={onBlur}
          />
        </div>
      );

    case "Action":
      return (
        <div className="grid place-items-start">
          <ControlActions {...props} />
        </div>
      );

    case "select":
      return (
        <div className="grid place-items-center">
          <Checkbox
            checked={row.getIsSelected()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
            styles={{ input: { cursor: "pointer" } }}
          />
        </div>
      );

    default:
      return (
        <div className="grid place-items-start">
          <EditableField
            as={isEditting ? "editable" : "readonly"}
            value={value.toLocaleString()}
            onBlur={onBlur}
            type="number"
            onChange={(e) => setValue(e.currentTarget.value)}
          />
        </div>
      );
  }
}
