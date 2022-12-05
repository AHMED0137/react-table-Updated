/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode } from 'react';

type OnlyWhenProps = {
  when: boolean;
  children: ReactNode;
};

export function Only({ when, children }: OnlyWhenProps): JSX.Element | null {
  return when ? <>{children}</> : null;
}