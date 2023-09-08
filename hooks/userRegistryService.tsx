import { useQuery } from '@tanstack/react-query';
import {
  listRegistries,
  listCollaboratorStatistics
} from '@/services/registry/registry.service';

const useLisRegistriesQuery = (
  company_id?: string,
  period?: string,
  collaboratorName?: string,
  skip?: number
) => {
  const { data, isLoading } = useQuery({
    queryFn: () => listRegistries(company_id, period, collaboratorName, skip),
    queryKey: ['registries', period, collaboratorName, skip]
  });

  const isEmpty = data?.registries?.length == 0;

  return {
    registries: data?.registries,
    count: data?.count,
    isLoading,
    isEmpty
  };
};

const useListCollaboratorStatistics = (
  collaborator_id: string,
  period: string
) => {
  const queryResult = useQuery({
    queryFn: () => listCollaboratorStatistics(collaborator_id, period),
    queryKey: ['statistic', collaborator_id, period]
  });

  return queryResult;
};

export { useLisRegistriesQuery, useListCollaboratorStatistics };
