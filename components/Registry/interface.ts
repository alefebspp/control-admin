import { Registry } from '@/services/registry/interface';
import { Dispatch, SetStateAction } from 'react';

export interface RegistryProps {
  registry: Registry;
  selectedRegistry: Registry | undefined;
  setSelectedRegistry: Dispatch<SetStateAction<Registry | undefined>>;
}
