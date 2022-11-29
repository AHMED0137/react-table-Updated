import { Title as MTitle, TitleProps } from '@mantine/core';

export const Title = ({ children, ...rest }: TitleProps) => {
  return <MTitle {...rest}>{children}</MTitle>;
};

Title.displayName = 'Title';

export default Title;
