import { Select, SelectProps } from '@mantine/core';

export type SelectBoxProps = SelectProps & {
  width?: number | string;
  value?: string;
  data: Array<string>;
};

 
function SelectInput({ value, width,label,name,data,...rest }: SelectBoxProps) {
  // const [newValue,setnewValue]= useState();
  return (
    <Select
      label={label}
      placeholder="Pick one"
      searchable
      nothingFound="Options not found"
      data={data}
      {...rest}
    />
  );
}

export default SelectInput;