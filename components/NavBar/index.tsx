'use client';
import { Button } from '@/components/ui/button';
import { Home, Users, LogOut } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import LinkComponent from '../LinkComponent';
import { UserAvatar } from '../UserAvatar';
import { useCollaboratorService } from '@/hooks/useCollaboratorService';
import { Skeleton } from '../ui/skeleton';

const NavBar = () => {
  const { signOut, user } = useAuthContext();

  const { useFindCollaboratorQuery } = useCollaboratorService();
  const { data: collaborator, isLoading } = useFindCollaboratorQuery(
    user?.user_id
  );

  return (
    <div className="w-[10%] p-2 h-full bg-white flex flex-col items-center gap-4">
      {isLoading ? (
        <Skeleton className="w-10 h-10 rounded-full" />
      ) : (
        <UserAvatar
          canUpdate
          className="w-10 h-10"
          source={collaborator?.avatar}
        />
      )}
      <LinkComponent className="bg-slate-200" label="Início" href="/dashboard">
        <Home className="lg:w-4 lg:h-4 xl:w-6 xl:h-6" />
      </LinkComponent>
      <LinkComponent className="bg-slate-200" label="Gestão" href="/management">
        <Users className="lg:w-4 lg:h-4 xl:w-6 xl:h-6" />
      </LinkComponent>
      <Button onClick={signOut} className="mt-auto">
        <LogOut className="mr-2 lg:w-4 lg:h-4 xl:w-6 xl:h-6" />
        <p className="lg:text-sm xl:text-lg">Sair</p>
      </Button>
    </div>
  );
};

export default NavBar;
