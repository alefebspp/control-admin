import { Adjustment } from '@/services/adjustment/interface';
import { Dispatch, SetStateAction } from 'react';

export interface AdjustmentDetailsProps {
  selectedAdjustment?: Adjustment;
  setSelectedAdjustment?: Dispatch<SetStateAction<Adjustment | undefined>>;
}
