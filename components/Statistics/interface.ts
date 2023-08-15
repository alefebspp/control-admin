import { Registry } from '@/services/registry/interface';

export interface StatisticsProps {
  selectedRegistry?: Registry;
  chart: React.ReactNode;
}
