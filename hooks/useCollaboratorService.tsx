import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createCollaborator,
  listCollaborators,
  findCollaborator,
  deleteCollaborator,
  updateCollaborator,
  changeCollaboratorAvatar
} from '@/services/collaborator/collaborator.service';

export const useCollaboratorService = () => {
  const queryClient = useQueryClient();

  const useCreateCollaboratorMutation = () => {
    return useMutation({
      mutationFn: createCollaborator,
      onSuccess: () => {
        queryClient?.invalidateQueries({ queryKey: ['collaborators'] });
      }
    });
  };

  const useUpdateCollaboratorMutation = () => {
    return useMutation({
      mutationFn: updateCollaborator,
      onSuccess: () => {
        queryClient?.invalidateQueries({ queryKey: ['collaborators'] });
      }
    });
  };

  const useDeleteCollaboratorMutation = () => {
    return useMutation({
      mutationFn: deleteCollaborator,
      onSuccess: () => {
        queryClient?.invalidateQueries({ queryKey: ['collaborators'] });
      }
    });
  };

  const useListCollaboratorsQuery = (company_id?: string) => {
    return useQuery({
      queryFn: () => listCollaborators(company_id),
      queryKey: ['collaborators']
    });
  };

  const useFindCollaboratorQuery = (collaborator_id?: string) => {
    return useQuery({
      queryFn: async () => findCollaborator(collaborator_id),
      queryKey: ['collaborator']
    });
  };

  const useChangeAvatarMutation = () => {
    return useMutation({
      mutationFn: changeCollaboratorAvatar,
      onSuccess: () => {
        queryClient?.invalidateQueries({ queryKey: ['collaborator'] });
      }
    });
  };

  return {
    useCreateCollaboratorMutation,
    useListCollaboratorsQuery,
    useFindCollaboratorQuery,
    useDeleteCollaboratorMutation,
    useUpdateCollaboratorMutation,
    useChangeAvatarMutation
  };
};
