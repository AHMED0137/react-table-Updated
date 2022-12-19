import { CellContext } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { MainData } from "./Datatable";
export function SimpleRow(props: CellContext<MainData, unknown>) {
  const {row, cell } = props;
  const initialValue = row.original;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  switch (props.cell.column.id) {
    default:
      return (
        <div className="grid place-items-start">
          {cell.getValue() as string}
        </div>
      );
  }
}
