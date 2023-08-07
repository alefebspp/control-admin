import { api } from '../api';
import { Company } from './interface';

const createCompany = async (params: Company) => {
  try {
    const { data } = await api.post<Company>('company/create', params);

    return data;
  } catch (error) {
    throw error;
  }
};

const findCompany = async (company_id?: string) => {
  try {
    const { data } = await api.get<Company>(`company/find/${company_id}`);

    return data;
  } catch (error) {
    throw error;
  }
};

export { createCompany };
