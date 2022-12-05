/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TextareaProps } from "@mantine/core";
import TextareaInput from "../input/Textarea";
import { useFormContext } from "./formProvider";
import { isRequired } from "./formUtils";

type FormTextareaProps =  TextareaProps & {
  value?: string;
  label?: string;
  name: string;
  icon?: React.ReactNode;
  placeholder?:string;
  minRows?:number;
  maxRows?:number;
};

export const FormTextBox = ({
  label,
  name,
  placeholder,
  icon,
  ...rest
}: FormTextareaProps) => {
  const { form, schema } = useFormContext();  
 
  return (
    <TextareaInput
       icon={icon}
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
      {...form?.getInputProps(name)}
      placeholder={placeholder}
      {...rest}
    />
  );
}
export default FormTextBox;
