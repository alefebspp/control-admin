'use client';
import { Button } from '@/components/ui/button';
import { Home, Users, LogOut } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import LinkComponent from '../LinkComponent';

interface NavBarProps {
  avatar: React.ReactNode;
}

const NavBar = ({ avatar }: NavBarProps) => {
  const { signOut, user } = useAuthContext();

  return (
    <div className="w-[10%] p-2 h-full bg-white flex flex-col items-center gap-4">
      {avatar}
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
