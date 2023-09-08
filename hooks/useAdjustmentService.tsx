import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listAdjustments,
  validateAdjustment
} from '@/services/adjustment/adjustment.service';

const useListAdjustmentsQuery = (
  company_id?: string,
  period?: string,
  collaborator_name?: string,
  skip?: number
) => {
  const { data, isLoading } = useQuery({
    queryFn: () =>
      listAdjustments({ company_id, period, collaborator_name, skip }),
    queryKey: ['adjustments', period, collaborator_name, skip]
  });

  const isEmpty = data?.adjustments?.length == 0;

  return {
    adjustments: data?.adjustments,
    count: data?.count,
    isLoading,
    isEmpty
  };
};

const useValidateAdjustmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: validateAdjustment,
    onSuccess: () => {
      queryClient?.invalidateQueries({ queryKey: ['adjustments'] });
    }
  });
};

export { useListAdjustmentsQuery, useValidateAdjustmentMutation };
