import { api } from '../api';
import { Registry, StatisticsResponse } from './interface';

interface ListRegistriesResponse {
  registries: Registry[];
  count: number;
}

const listRegistries = async (
  company_id?: string,
  period?: string,
  collaboratorName?: string,
  skip?: number
) => {
  try {
    let url: string = '';

    if (period) {
      url = `&period=${period}`;
    }

    if (collaboratorName) {
      url = `&collaboratorName=${collaboratorName}`;
    }

    if (period && collaboratorName) {
      url = `&period=${period}&collaboratorName=${collaboratorName}`;
    }

    const { data } = await api.get<ListRegistriesResponse>(
      `registry/all/${company_id}?skip=${skip}${url}`
    );

    return data;
  } catch (error) {
    throw error;
  }
};

const listCollaboratorStatistics = async (
  collaborator_id: string,
  period: string
) => {
  try {
    const { data } = await api.get<StatisticsResponse>(
      `registry/calculate/${collaborator_id}?period=${period}`
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export { listRegistries, listCollaboratorStatistics };
