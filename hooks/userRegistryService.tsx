import { useQuery, useQueryClient } from '@tanstack/react-query';
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

const useListCollaboratorStatistics = (company_id: string, period: string) => {
  const queryResult = useQuery({
    queryFn: () => listCollaboratorStatistics(company_id, period),
    queryKey: ['statistic']
  });

  return queryResult;
};

export { useLisRegistriesQuery, useListCollaboratorStatistics };
