import { Skeleton } from '@/components/ui/skeleton';

export const RegistrySkeleton = () => {
  return (
    <div className="w-full h-[10%] flex justify-between bg-white border-b border-slate-300 p-2">
      <div className="w-[15%] h-full flex flex-col items-center justify-between">
        <Skeleton className="w-[50px] h-[50px] rounded-full" />
      </div>
      <div className="w-[80%] h-full flex flex-col justify-start">
        <Skeleton className="w-full h-[40%] flex justify-between rounded-lg" />
      </div>
    </div>
  );
};

export const RegistrySkeletonGroup = () => {
  return (
    <div className="w-full h-full flex flex-col p-2 overflow-y-auto">
      <RegistrySkeleton />
      <RegistrySkeleton />
      <RegistrySkeleton />
      <RegistrySkeleton />
      <RegistrySkeleton />
      <RegistrySkeleton />
      <RegistrySkeleton />
      <RegistrySkeleton />
      <RegistrySkeleton />
      <RegistrySkeleton />
    </div>
  );
};
