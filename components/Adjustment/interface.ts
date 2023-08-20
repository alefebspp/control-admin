import { Adjustment } from '@/services/adjustment/interface';
import { Dispatch, SetStateAction } from 'react';

export interface AdjustmentProps {
  adjustment: Adjustment;
  selectedAdjustment: Adjustment | undefined;
  setSelectedAdjustment: Dispatch<SetStateAction<Adjustment | undefined>>;
}
