import { api } from '../api';
import { Adjustment, ValidateAdjustmentProps } from './interface';

interface ListAdjustmentsOption {
  company_id?: string;
  period?: string;
  collaborator_name?: string;
  skip?: number;
}

interface ListAdjustmentsResponse {
  adjustments: Adjustment[];
  count: number;
}

const listAdjustments = async ({
  company_id,
  collaborator_name,
  period,
  skip
}: ListAdjustmentsOption) => {
  try {
    const queryParams: string[] = [];

    queryParams.push(`skip=${skip}`);

    if (company_id) {
      queryParams.push(`companyId=${company_id}`);
    }
    if (period) {
      queryParams.push(`period=${period}`);
    }
    if (collaborator_name) {
      queryParams.push(`collaboratorName=${collaborator_name}`);
    }

    const queryString =
      queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    const { data } = await api.get<ListAdjustmentsResponse>(
      `requests${queryString}`
    );

    return data;
  } catch (error) {
    throw error;
  }
};

const validateAdjustment = async ({
  adjustment_id,
  validate_data
}: ValidateAdjustmentProps): Promise<Adjustment> => {
  try {
    const { data } = await api.patch(
      `/requests/${adjustment_id}`,
      validate_data
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export { listAdjustments, validateAdjustment };
