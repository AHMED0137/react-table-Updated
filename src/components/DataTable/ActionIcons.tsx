import { ActionIcon, Group } from "@mantine/core";
import { Copy, Edit, Trash } from "tabler-icons-react";

export function ActionIcons({}) {
  return (
    <Group>
      <ActionIcon>
        <Edit size={18} />
      </ActionIcon>
      <ActionIcon>
        <Copy size={18} />
      </ActionIcon>
      <ActionIcon>
        <Trash size={18} />
      </ActionIcon>
    </Group>
  );
}
