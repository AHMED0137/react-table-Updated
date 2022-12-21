/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { InputProps, TextInput } from "@mantine/core";
import { useEffect } from "react";

import { useFormContext } from "./formProvider";
import { isRequired } from "./formUtils";

type FormFieldProps = InputProps & {
  value?: string |number;
  label?: string;
  name: string;
  icon?: React.ReactNode;
  description?: string;
  placeholder?:string;
  type: string;
  onChange?: (value:  number|string) => void
};

export const FormField = ({
  label,
  type,
  name,
  placeholder,
  description,
  icon,
  value,
  onChange,
  ...rest
}: FormFieldProps) => {
  const { form, schema } = useFormContext();  
// console.log(form?.getInputProps(name),"input props")
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
      value={form?.getInputProps(name).value}
      label={label}
      radius="xs"
      required={isRequired(name, schema!)}
      onFocus={form?.getInputProps(name).onFocus}
      onBlur={form?.getInputProps(name).onBlure}
      onChange={(e)=>{
        const value = e.currentTarget.value;
        form?.setFieldValue(name, form.values[name]+value  )
        //form?.getInputProps(name).onChange(e.currentTarget.value)
        console.log(form?.values)
        if(onChange) {onChange(form?.values[name])}
      }}
       {...form?.getInputProps(name)}
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
