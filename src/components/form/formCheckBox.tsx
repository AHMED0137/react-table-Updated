/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CheckboxProps } from "@mantine/core";
import { ReactNode } from "react";
import CheckBox from "../input/checkBox";
import { useFormContext } from "./formProvider";
type FormCheckBoxProps = CheckboxProps &{
  value?: string;
  label?: string;
  name: string;
  icon?: ReactNode;
  color?:string;
  onChange:() => void
};

export const FormCheck = ({
  label,
  value,
  name,
  icon,
  color,
  onChange,
  ...rest
}: FormCheckBoxProps) => {
  const { form, schema } = useFormContext();
  return (
    <CheckBox
      icon={icon}
      name={name}
      {...form?.getInputProps(name)}
      label={label}
      color={color}
      onChange={onChange}
      // required={isRequired(name, schema!)}
      {...rest}
    />
  );
};

export default FormCheck;
