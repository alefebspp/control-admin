import NavBar from '@/components/NavBar';

interface NavBarContainerProps {
  children: React.ReactNode;
}

const NavBarContainer = async ({ children }: NavBarContainerProps) => {
  return (
    <div className="w-[100vw] h-[100vh] flex">
      <NavBar />
      {children}
    </div>
  );
};

export default NavBarContainer;
