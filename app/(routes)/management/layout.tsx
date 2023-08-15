import NavBarContainer from '@/layout/NavBarContainer';
import { ManagementOptions } from './ManagementOptions';

export default function ManagementLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <NavBarContainer>
      <div className="w-full h-full flex flex-col justify-between items-center p-4 bg-gray-400">
        <div className="w-full flex flex-col justify-start p-2 bg-white h-[20%] rounded-lg border border-slate-500">
          <h1 className="text-xl font-medium">Gestão</h1>
          <ManagementOptions />
        </div>
        <div className="w-full  h-[75%] rounded-lg">{children}</div>
      </div>
    </NavBarContainer>
  );
}
