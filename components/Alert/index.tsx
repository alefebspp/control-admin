import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import { Collaborator } from '@/services/collaborator/interface';
import { useCollaboratorService } from '@/hooks/useCollaboratorService';
import { AppError } from '@/lib/AppError';

interface AlertProps {
  children: React.ReactNode;
  collaborator: Collaborator;
}

export function Alert({ children, collaborator }: AlertProps) {
  const { toast } = useToast();

  const { useDeleteCollaboratorMutation } = useCollaboratorService();

  const { mutateAsync: deleteCollaborator, isLoading } =
    useDeleteCollaboratorMutation();

  const handleDeleteCollaborator = async (collaborator_id?: string) => {
    try {
      const response = await deleteCollaborator(collaborator_id);

      toast({
        title: response.message,
        variant: 'success'
      });
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível deletar o colaborador';
      toast({
        title: title,
        variant: 'destructive'
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription className="flex gap-[5px]">
            O colaborador
            <p className="font-medium text-slate-800">
              {` ${String(
                collaborator.name + ' ' + collaborator.surname
              ).toUpperCase()} `}
            </p>
            irá ser deletado
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Button variant="outline" size="sm">
              Cancelar
            </Button>
          </AlertDialogCancel>
          <Button
            size="sm"
            onClick={() => handleDeleteCollaborator(collaborator.id)}
            isLoading={isLoading}
            className="bg-red-500 hover:bg-red-600"
          >
            Deletar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
