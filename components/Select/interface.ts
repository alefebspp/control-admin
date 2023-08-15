import { Option } from '@/utils';
import { Dispatch, SetStateAction } from 'react';

export interface SelectComponentProps {
  options: Option[];
  className?: string;
  setSelectedOption: Dispatch<SetStateAction<string | undefined>>;
  placeholder?: string;
  defaultValue?: string;
}
