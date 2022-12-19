/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SelectProps } from "@mantine/core";
import SelectInput from "../input/Select";

import { useFormContext } from "./formProvider";
import { isRequired } from "./formUtils";
type FormSelectProps = SelectProps &{
  value?: string;
  label?: string;
  name: string;
  data: Array<string>;
  icon?:React.ReactNode;
};

export const FormSelectInput = ({
  label,
  value,
  name,
  data,
  icon,
  ...rest
}: FormSelectProps) => {
  const { form, schema } = useFormContext();
  return (
    <SelectInput
      icon={icon}
      error={form?.errors[name]}
      errorProps={{
        style: {
          marginTop: 0,
          fontStyle: "italic",
          display: "inline-flex",
        },
      }}
      {...form?.getInputProps(name)}
      label={label}
      radius="xs"
      required={isRequired(name, schema!)}
      data={data}
      {...rest}
    />
  );
};

export default FormSelectInput;
