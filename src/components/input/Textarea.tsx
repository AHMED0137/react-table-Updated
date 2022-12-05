import { Textarea, TextareaProps } from '@mantine/core';

export type Textareaprops = TextareaProps & {
  width?: number | string;
  value?: string;
  minRows:number;
  maxRows:number;
};


function TextareaInput({ value, placeholder,minRows, maxRows,label,width, ...rest }: Textareaprops) {
  return (
    <>
      <Textarea
        label={label}
        placeholder={placeholder}
        autosize
        minRows={minRows}
        maxRows={maxRows}
       {...rest}
      />
    </>
  );
}
export default TextareaInput;
