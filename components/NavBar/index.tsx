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
    <div className="lg:w-[15%] xl:w-[10%] p-2 h-full bg-white flex flex-col items-center gap-4">
      {avatar}
      <LinkComponent className="bg-slate-200" label="Início" href="/dashboard">
        <Home className="w-6 h-6" />
      </LinkComponent>
      <LinkComponent className="bg-slate-200" label="Gestão" href="/management">
        <Users className="w-6 h-6" />
      </LinkComponent>
      <Button onClick={signOut} className="mt-auto">
        <LogOut className="mr-2 w-6 h-6" />
        <p className="text-lg">Sair</p>
      </Button>
    </div>
  );
};

export default NavBar;
