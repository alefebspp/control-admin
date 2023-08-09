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

const findCompany = async () => {
  try {
    const response = await fetch(`http://localhost:3002/api/company/find`);

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export { createCompany, findCompany, updateCompany };
