import { Input, InputProps, Text } from "@mantine/core";
import React, { FC } from "react";

type FieldOptions = {
  editable: FC<InputFieldProps>;
  readonly: FC<ReadOnlyFieldProps>;
};

type InputFieldProps = InputProps & {
  as: "editable";
  id?: string;
  ref?: React.Ref<HTMLInputElement>;
  onClick?: React.InputHTMLAttributes<HTMLInputElement>["onClick"];
  onBlur?: React.InputHTMLAttributes<HTMLInputElement>["onBlur"];
  onChange?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
  value: React.InputHTMLAttributes<HTMLInputElement>["value"];
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  readOnlyClasses?: string;
};

type ReadOnlyFieldProps = {
  as: "readonly";
  value: React.InputHTMLAttributes<HTMLInputElement>["value"];
  readOnlyClasses?: string;
};

const fieldOptions: FieldOptions = {
  editable: React.forwardRef<HTMLInputElement, InputFieldProps>(
    ({ value, onChange, id, ...rest }, ref) => (
      <Input
        value={value}
        size="xs"
        id={id}
        onChange={onChange}
        ref={ref}
        {...rest}
      />
    )
  ),
  readonly: ({ value, readOnlyClasses }: ReadOnlyFieldProps) => (
    <Text size="xs" className={readOnlyClasses}>
      {value}
    </Text>
  ),
};

export type EditableFieldProps = ReadOnlyFieldProps | InputFieldProps;

export const EditableField = React.forwardRef<
  HTMLInputElement,
  EditableFieldProps
>(({ as, value, ...rest }, ref) => {
  const Field = fieldOptions[as] as FC<EditableFieldProps>;
  return <Field as={as} value={value} ref={ref} {...rest} />;
});
