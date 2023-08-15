'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { SelectComponentProps } from './interface';

export const SelectComponent = ({
  options,
  className,
  setSelectedOption,
  placeholder,
  defaultValue
}: SelectComponentProps) => {
  const handleSelectedOption = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <Select defaultValue={defaultValue} onValueChange={handleSelectedOption}>
      <SelectTrigger className="w-[40%] border-slate-700">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ label, value }) => {
          return <SelectItem value={value}>{label}</SelectItem>;
        })}
      </SelectContent>
    </Select>
  );
};
