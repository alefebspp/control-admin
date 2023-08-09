import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { findCompany, updateCompany } from '@/services/company/company.service';

export const useCompanyService = () => {
  const queryClient = useQueryClient();

  const useFindCompanyQuery = () => {
    return useQuery({
      queryFn: findCompany,
      queryKey: ['company']
    });
  };

  const useUpdateCompanyMutation = () => {
    return useMutation({
      mutationFn: updateCompany,
      onSuccess: () => {
        queryClient?.invalidateQueries({ queryKey: ['company'] });
      }
    });
  };

  return {
    useFindCompanyQuery,
    useUpdateCompanyMutation
  };
};
