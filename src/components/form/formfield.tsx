/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { InputProps, TextInput } from "@mantine/core";

import { useFormContext } from "./formProvider";
import { isRequired } from "./formUtils";

type FormFieldProps = InputProps & {
  value?: string;
  label?: string;
  name: string;
  icon?: React.ReactNode;
  description?: string;
  placeholder?:string;
  type: string;
  onChange?: (value:  string |number) => void
};

export const FormField = ({
  label,
  type,
  name,
  placeholder,
  description,
  icon,
  onChange,
  ...rest
}: FormFieldProps) => {
  const { form, schema } = useFormContext();  

  return (
    <TextInput
       icon={icon}
      description={description}
      error={form?.errors[name]}
      errorProps={{
        style: {
          marginTop: 0,
          fontStyle: "italic",
          display: "inline-flex",
        },
      }}
     
      label={label}
      radius="xs"
      required={isRequired(name, schema!)}
      onFocus={form?.getInputProps(name).onFocus}
      onBlur={form?.getInputProps(name).onBlure}
      onChange={(e)=>{
        form?.getInputProps(name).onChange(e.currentTarget.value)
        if(onChange) {onChange(form?.values[name])}
      }}
      // {...form?.getInputProps(name)}
      placeholder={placeholder}
      type={type}
      {...rest}
    />
  );

  function newFunction() {
    console.log("type", type);
  }
};

export default FormField;
