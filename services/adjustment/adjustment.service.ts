import { api } from '../api';
import { Adjustment, ValidateAdjustmentProps } from './interface';

const listAdjustments = async (
  company_id?: string,
  period?: string
): Promise<Adjustment[]> => {
  try {
    let url: string = '';

    if (company_id) {
      url = `?companyId=${company_id}`;
    }
    if (period) {
      url = `?period=${period}`;
    }
    if (company_id && period) {
      url = `?companyId=${company_id}&period=${period}`;
    }

    const { data } = await api.get(`requests${url}`);

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
