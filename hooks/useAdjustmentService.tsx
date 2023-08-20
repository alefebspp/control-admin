import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listAdjustments,
  validateAdjustment
} from '@/services/adjustment/adjustment.service';

const useListAdjustmentsQuery = (company_id?: string, period?: string) => {
  const queryResult = useQuery({
    queryFn: () => listAdjustments(company_id, period),
    queryKey: ['adjustments', period]
  });

  return queryResult;
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
