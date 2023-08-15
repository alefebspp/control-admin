import { api } from '../api';
import { Company, UpdateCompanyParams } from './interface';

const createCompany = async (params: Company) => {
  try {
    const { data } = await api.post<Company>('company/create', params);

    return data;
  } catch (error) {
    throw error;
  }
};

const updateCompany = async ({ body, company_id }: UpdateCompanyParams) => {
  try {
    const { data } = await api.patch<Company>(
      `company/update/${company_id}`,
      body
    );

    return data;
  } catch (error) {
    throw error;
  }
};

const findCompany = async (company_id: string | undefined) => {
  try {
    const { data } = await api.get(`company/find/${company_id}`);

    return data;
  } catch (error) {
    throw error;
  }
};

export { createCompany, findCompany, updateCompany };
