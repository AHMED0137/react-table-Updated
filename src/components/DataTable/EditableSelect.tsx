import React, { FC } from "react";
import { Select, SelectItem, SelectProps, Text } from "@mantine/core";

import { SelectSharedProps } from "@mantine/core/lib/Select/Select";
import { uniq } from "lodash";

type FieldOptions = {
  editable: FC<SelectFieldProps>;
  readonly: FC<ReadOnlyFieldProps>;
};

type SelectFieldProps = SelectProps & {
  as: "editable";
  id?: string;
  ref?: React.Ref<HTMLInputElement>;
  onClick?: SelectSharedProps<SelectItem, string | null>["value"];
  onBlur?: React.InputHTMLAttributes<HTMLInputElement>["onBlur"];
  onChange?: SelectSharedProps<SelectItem, string | null>["onChange"];
  value: SelectSharedProps<SelectItem, string | null>["value"];
  data: SelectSharedProps<SelectItem, string | null>["data"];
};

type ReadOnlyFieldProps = {
  as: "readonly";
  value: SelectSharedProps<SelectItem, string | null>["value"];
  data: SelectSharedProps<SelectItem, string | null>["data"];
};

const fieldOptions: FieldOptions = {
  editable: React.forwardRef<HTMLInputElement, SelectFieldProps>(
    ({ value, onChange, data, id, ...rest }, ref) => (
      <Select
        value={value}
        id={id}
        size="xs"
        onChange={onChange}
        data={uniq(data)}
        ref={ref}
        {...rest}
      />
    )
  ),
  readonly: ({ value }: ReadOnlyFieldProps) => <Text size="xs">{value}</Text>,
};

export type EditableSelectProps = ReadOnlyFieldProps | SelectFieldProps;

export const EditableSelect = React.forwardRef<
  HTMLInputElement,
  EditableSelectProps
>(({ as, value, ...rest }, ref) => {
  const Field = fieldOptions[as] as FC<EditableSelectProps>;
  return <Field as={as} value={value} ref={ref} {...rest} />;
});
