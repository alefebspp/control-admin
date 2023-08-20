import { Collaborator } from '../collaborator/interface';
import { Registry } from '../registry/interface';

export interface Adjustment {
  id: string;
  registry_id: string;
  collaborator_id: string;
  company_id: string;
  status?: string;
  reason: string;
  registry_type: keyof Pick<
    Registry,
    'start' | 'end' | 'interval_start' | 'interval_end'
  >;
  new_value: string;
  previous_value?: string;
  registry_location?: string;
  new_location: string;
  registry: Registry;
  collaborator: Collaborator;
  reviewer?: string;
  adjustment_reviewer?: Collaborator;
  reviewer_response?: string;
}

export interface ValidateAdjustmentProps {
  adjustment_id: string | undefined;
  validate_data: {
    reviewer: string | undefined;
    new_status: string;
  };
}
