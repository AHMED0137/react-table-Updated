import { Checkbox, CheckboxProps } from '@mantine/core';

export type CheckBoxProps = CheckboxProps & {
  label?:string;
  description?:string; 
  value?: string;
  name:string;
  color?:string;
  icon?: React.ReactNode;
  onChange:() => void;	

};
function CheckBox({label,description,onChange,color,icon,...rest}:CheckBoxProps) {
  return (
    <Checkbox
      label={label}
      description={description}
      color={color}
      icon={icon}
      onChange={onChange}
      {...rest}
    />
  );
}
export default CheckBox;