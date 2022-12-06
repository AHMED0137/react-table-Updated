import { Textarea, TextareaProps } from '@mantine/core';

export type Textareaprops = TextareaProps & {
  width?: number | string;
  value?: string;
  minRows:number;
  maxRows:number;
};


function TextareaInput({ value, placeholder,minRows, maxRows,name,label,width, ...rest }: Textareaprops) {
  return (
    <>
      <Textarea
        label={label}
        placeholder={placeholder}
        autosize
        minRows={minRows}
        maxRows={maxRows}
        value={value}
       {...rest}
      />
    </>
  );
}
export default TextareaInput;
