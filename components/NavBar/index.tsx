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
          className="lg:w-[40px] lg:h-[40px] xl:w-[60px] xl:h-[60px]"
          source={collaborator?.avatar}
        />
      )}
      <LinkComponent label="Início" href="/dashboard">
        <Home className="lg:w-4 lg:h-4 xl:w-6 xl:h-6" />
      </LinkComponent>
      <LinkComponent label="Gestão" href="/management">
        <Users className="lg:w-4 lg:h-4 xl:w-6 xl:h-6" />
      </LinkComponent>
      <Button
        onClick={signOut}
        variant="outline"
        className=" lg:w-full xl:w-[80%] h-[5%] mt-auto border-gray-400"
      >
        <LogOut className="mr-2 w-4 h-4" />
        <p className="lg:text-xs xl:text-sm">Sair</p>
      </Button>
    </div>
  );
};

export default NavBar;
