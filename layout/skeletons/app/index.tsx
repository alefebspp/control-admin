import { Skeleton } from '@/components/ui/skeleton';
import { DashboardSkeleton } from '../dashboard';

export const AppSkeleton = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex bg-gray-400">
      <div className="lg:w-[15%] xl:w-[10%] p-2 h-full bg-white flex flex-col items-center gap-4 bg-white">
        <Skeleton className="w-[50px] h-[50px] rounded-full" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-[80%] h-10 mt-auto" />
      </div>
      <DashboardSkeleton />
    </div>
  );
};
