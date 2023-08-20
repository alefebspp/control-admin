'use client';
import { UserCog, UserX } from 'lucide-react';
import { Alert } from '@/components/Alert';
import { UserAvatar } from '@/components/UserAvatar';
import { Collaborator as CollaboratorInterface } from '@/services/collaborator/interface';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { UpdateCollaboratorForm } from '../UpdateCollaboratorForm';
import { useAuthContext } from '@/context/AuthContext';

interface CollaboratorProps {
  collaborator: CollaboratorInterface;
}

export const Collaborator = ({ collaborator }: CollaboratorProps) => {
  const { user } = useAuthContext();

  const userName = `${user?.user_name} ${user?.user_surname}`;
  const collaboratorName = `${collaborator.name} ${collaborator.surname}`;

  return (
    <div className="w-full flex justify-between items-center bg-gray-300 shadow-lg rounded-sm mb-4">
      <div className="w-[70%] h-full flex items-center justify-start gap-2 p-2">
        <UserAvatar
          source={collaborator.avatar}
          className="w-[30px] h-[30px]"
        />
        <p className="lg:text-xs xl:text-sm">
          {userName == collaboratorName ? 'Você' : collaboratorName}
        </p>
      </div>
      <div className="w-[30%] h-full flex justify-center items-center gap-4">
        {user?.user_id != collaborator.id && (
          <Alert collaborator={collaborator}>
            <UserX className="w-6 h-6 text-red-500 hover:opacity-80 cursor-pointer" />
          </Alert>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <UserCog className="w-6 h-6 hover:opacity-80 cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] h-[60%]">
            <DialogHeader>
              <DialogTitle>
                {collaborator.name} {collaborator.surname}
              </DialogTitle>
              <DialogDescription>
                Atualizar informações do colaborador
              </DialogDescription>
            </DialogHeader>
            <UpdateCollaboratorForm collaborator={collaborator} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
