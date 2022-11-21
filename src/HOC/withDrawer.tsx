import { Drawer, DrawerProps, MediaQuery } from "@mantine/core";

import React from "react";

export function withDrawer<T extends Object>(
  Component: React.ComponentType<T & DrawerProps>
) {
  return function DrawerWrapper({
    opened,
    onClose,
    size,
    position,
    title,
    padding,
    ...rest
  }: T & DrawerProps) {
    return (
      <>
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Drawer
            opened={opened}
            onClose={onClose}
            title={title}
            padding={padding ?? "xl"}
            size={size ?? "50%"}
            position={position ?? "right"}
          >
            <Component {...(rest as T & DrawerProps)} />
          </Drawer>
        </MediaQuery>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Drawer
            opened={opened}
            onClose={onClose}
            title={title}
            padding={padding ?? "xl"}
            size={size ?? "100%"}
            position={position ?? "right"}
          >
            <Component {...(rest as T & DrawerProps)} />
          </Drawer>
        </MediaQuery>
      </>
    );
  };
}
