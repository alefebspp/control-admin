import { cookies } from 'next/headers';
import { getCollaborator } from '@/lib/actions';

import NavBar from '@/components/NavBar';
import { UserAvatar } from '@/components/UserAvatar';

interface NavBarContainerProps {
  children: React.ReactNode;
}

const NavBarContainer = async ({ children }: NavBarContainerProps) => {
  const token = cookies().get('@control-token');

  const collaborator = await getCollaborator(token?.value);

  return (
    <div className="w-[100vw] h-[100vh] flex">
      <NavBar
        avatar={
          <UserAvatar className="w-10 h-10" source={collaborator.avatar} />
        }
      />
      {children}
    </div>
  );
};

export default NavBarContainer;
