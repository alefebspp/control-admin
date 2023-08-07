'use client';

import { UserPlus, Users } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

import { CreateCollaboratorForm } from '@/components/CreateCollaboratorForm';
import { Collaborator } from '@/components/Collaborator';

import { useCollaboratorService } from '@/hooks/useCollaboratorService';
import PageSkeleton from './skeleton';

const Management = () => {
  const { useListCollaboratorsQuery } = useCollaboratorService();
  const { data: collaborators, isLoading } = useListCollaboratorsQuery();

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="w-full h-full flex justify-between items-center">
      <div className="w-[48%] h-full flex flex-col gap-4 p-2 bg-white rounded-md">
        <div className="w-full flex items-end gap-2">
          <UserPlus className="w-10 h-10" />
          <p className="text-lg font-medium">Adicionar colaborador</p>
        </div>
        <CreateCollaboratorForm />
      </div>
      <div className="w-[48%] h-full flex flex-col gap-4 p-2 bg-white rounded-md">
        <div className="w-full flex items-end gap-2">
          <Users className="w-10 h-10" />
          <p className="text-lg font-medium">Colaboradores</p>
        </div>
        <ScrollArea className="lg:w-full xl:w-[60%] h-[80%] p-2">
          {collaborators?.map(collaborator => {
            return (
              <Collaborator collaborator={collaborator} key={collaborator.id} />
            );
          })}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Management;
