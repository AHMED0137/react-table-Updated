import { ActionIcon, Group } from "@mantine/core";
import { Backspace, DeviceFloppy, Edit, Trash } from "tabler-icons-react";

import { CellContext } from "@tanstack/react-table";
import { FC } from "react";
import { TableData } from "./DataTable2";

const actionButtons = {
  view: ({ onClick, onCancel, rowId }: ViewActionsProps) => (
    <Group>
      <ActionIcon
        onClick={() => {
          onClick?.("editClick", rowId);
        }}
        size={"lg"}
        radius="xl"
      >
        <Edit />
      </ActionIcon>
      <ActionIcon
        onClick={() => onCancel?.("deleteClick", rowId)}
        color="red"
        size={"lg"}
        radius="xl"
      >
        <Trash />
      </ActionIcon>
    </Group>
  ),

  edit: ({ onClick, onCancel, rowId }: EditActionsProps) => (
    <Group>
      <ActionIcon
        onClick={() => onClick?.("saveClick", rowId)}
        size={"lg"}
        radius="xl"
      >
        <DeviceFloppy />
      </ActionIcon>
      <ActionIcon
        onClick={() => onCancel?.("cancelClick", rowId)}
        size={"lg"}
        radius="xl"
      >
        <Backspace />
      </ActionIcon>
    </Group>
  ),
};

type ViewActionsProps = {
  actionType: "view";
  rowId: string | number;
  key: string;
  onClick?: (
    action: "saveClick" | "cancelClick" | "deleteClick" | "editClick",
    rowIndex: string | number
  ) => void;
  onCancel?: (
    action: "saveClick" | "cancelClick" | "deleteClick" | "editClick",
    rowIndex: string | number
  ) => void;
};

type EditActionsProps = {
  actionType: "edit";
  rowId: string | number;
  key: string;
  onClick?: (
    action: "saveClick" | "cancelClick" | "deleteClick" | "editClick",
    rowId: string | number
  ) => void;
  onCancel?: (
    action: "saveClick" | "cancelClick" | "deleteClick" | "editClick",
    rowIndex: string | number
  ) => void;
};

export type ActionButtonsProps = ViewActionsProps | EditActionsProps;

export function ActionButtons({
  actionType,
  rowId,
  ...rest
}: ActionButtonsProps) {
  const Buttons = actionButtons[actionType] as FC<ActionButtonsProps>;
  return <Buttons actionType={actionType} rowId={rowId} {...rest} />;
}

export const ControlActions = <T extends { id: string | number }>({
  cell,
  row,
  table,
}: CellContext<T, unknown>) => {
  const tableState = table.options.meta?.getState();

  const isRowEditing = (tableState: TableData<T>) => {
    const { changedRows } = tableState;
    const index = changedRows.findIndex(
      (changedRow) => changedRow.rowId === row.original.id
    );
    return index >= 0 && changedRows[index].isEditing;
  };

  const isEditting = isRowEditing(tableState!);

  return (
    <ActionButtons
      key={cell.column.id + row.index}
      actionType={isEditting ? "edit" : "view"}
      onClick={(action, rowId) => {
        if (action === "editClick")
          table.options.meta?.setRowEditing(rowId, true);
        else if (action === "saveClick") {
          table.options.meta?.setRowEditing(rowId, false);
        }
      }}
      onCancel={(action, rowId) => {
        if (action === "cancelClick") {
          table.options.meta?.cancelEdit(rowId);
        } else if (action === "deleteClick") {
          table.options.meta?.deleteRow(rowId);
        }
      }}
      rowId={row.original.id}
    />
  );
};
