import { ActionIcon, Group } from "@mantine/core";
import { Copy, Edit, Trash } from "tabler-icons-react";

import { Id } from "../data-table";

export type Action = "delete" | "edit" | "copy" | "new";

type ActionIconsProps = {
  onClick: (rowId: Id, action: Action) => void;
  rowId: Id;
};

export function ActionIcons({ onClick, rowId }: ActionIconsProps) {
  function handleClick(action: Action) {
    if (onClick) onClick(rowId, action);
  }
  return (
    <Group>
      <ActionIcon onClick={() => handleClick("edit")}>
        <Edit size={18} />
      </ActionIcon>
      <ActionIcon>
        <Copy size={18} onClick={() => handleClick("copy")} />
      </ActionIcon>
      <ActionIcon>
        <Trash size={18} onClick={() => handleClick("delete")} />
      </ActionIcon>
    </Group>
  );
}
