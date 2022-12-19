import { joiResolver, useForm } from "@mantine/form";

import Joi from "joi";
import { FormEvent } from "react";
import { FormButton } from "./formButton";
import { FormCheck } from "./formCheckBox";
import { FormField } from "./formfield";
import { FormProvider } from "./formProvider";
import FormSelectInput from "./formSelectInput";
import FormTextBox from "./formTextarea";

export interface FormProps<T> extends React.ComponentPropsWithRef<"form"> {
  initialValues: T;
  schema?: Joi.Schema<T>;
  onFormSubmit: (values: T) => void;
}

export const Form = <T extends object>({
  initialValues,
  children,
  onFormSubmit,
  schema,
  ...rest
}: FormProps<T>) => {
  const form = useForm<T>({
    initialValues,
    validate: joiResolver(schema),
    validateInputOnChange: true,
  });

  return (
    <FormProvider value={{ form, initialValues, schema }}>
      <form onSubmit={handleFormSubmit} {...rest}>
        {children}
      </form>
    </FormProvider>
  );

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onFormSubmit(form?.values);
  }
};

Form.displayName = "Form";
Form.FormField = FormField;
Form.FormSelectInput=FormSelectInput;
Form.FormTextarea = FormTextBox;
Form.FormButton = FormButton;
Form.FormCheck=FormCheck;

export default Form;
