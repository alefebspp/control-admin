import { useQuery } from '@tanstack/react-query';
import {
  listRegistries,
  listCollaboratorStatistics
} from '@/services/registry/registry.service';

const useLisRegistriesQuery = (company_id?: string) => {
  const queryResult = useQuery({
    queryFn: () => listRegistries(company_id),
    queryKey: ['registries']
  });

  return queryResult;
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
