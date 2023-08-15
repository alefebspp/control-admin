import { api } from '../api';
import { Registry, StatisticsResponse } from './interface';

const listRegistries = async (company_id?: string) => {
  try {
    const { data } = await api.get<Registry[]>(`registry/all/${company_id}`);

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
