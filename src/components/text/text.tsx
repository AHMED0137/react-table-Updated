/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TextProps as MTextProps,
  Text as MantineText,
  createPolymorphicComponent,
  createStyles,
} from '@mantine/core';

import React from 'react';

export interface ITextProps extends MTextProps {
  fontStyle?: 'normal' | 'italic' | 'oblique';
}

export const TextComponent = React.forwardRef<HTMLDivElement, ITextProps>(
  ({ children, fontStyle, className, ...rest }, ref) => {
    const { classes, cx } = useStyles({ fontStyle });

    return (
      <MantineText
        className={cx([classes.text, className])}
        ref={ref}
        {...rest}
      >
        {children}
      </MantineText>
    );
  }
);

TextComponent.displayName = 'Text';

export const Text = createPolymorphicComponent<'div', ITextProps>(
  TextComponent
);

export function Caption({ ...rest }: ITextProps) {
  return (
    <Text
      align="left"
      color="gray"
      component="caption"
      fontStyle="italic"
      size="sm"
      {...rest}
    />
  );
}

const useStyles = createStyles((theme, { fontStyle }: ITextProps) => ({
  text: {
    fontStyle: fontStyle || 'normal',
  },
}));
