import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { findCompany, updateCompany } from '@/services/company/company.service';

export const useCompanyService = () => {
  const queryClient = useQueryClient();

  const useFindCompanyQuery = (company_id?: string) => {
    return useQuery({
      queryFn: () => findCompany(company_id),
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
