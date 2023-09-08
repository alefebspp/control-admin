import { Skeleton } from '@/components/ui/skeleton';

export const AdjustmentSkeleton = () => {
  return (
    <div
      className={
        'w-full h-[18%] bg-white flex cursor-pointer border-b border-slate-300'
      }
    >
      <Skeleton className="w-[15%] h-full rounded-none" />
      <div className="w-[20%] h-full flex flex-col p-2">
        <div className="w-full h-[20%] flex justify-center items-center">
          <Skeleton className=" w-[60%] h-4" />
        </div>
        <div className="w-full h-[80%] flex flex-col justify-center items-center">
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      </div>
      <div className="w-[20%] h-full flex flex-col p-2">
        <div className="w-full h-[20%] flex justify-center items-center">
          <Skeleton className=" w-[60%] h-4" />
        </div>
        <div className="w-full h-[80%] flex flex-col justify-center items-center ">
          <Skeleton className=" w-[40%] h-4" />
        </div>
      </div>
      <div className="w-[20%] h-full flex flex-col p-2">
        <div className="w-full h-[20%] flex justify-center items-center">
          <Skeleton className=" w-[60%] h-4" />
        </div>
        <div className="w-full h-[80%] flex flex-col justify-center items-center ">
          <Skeleton className=" w-[40%] h-4" />
        </div>
      </div>
      <div className="w-[25%] h-full flex flex-col p-2">
        <div className="w-full h-[20%] flex justify-center items-center">
          <Skeleton className=" w-[60%] h-4" />
        </div>
        <div className="w-full h-[80%] flex flex-col justify-center items-center ">
          <Skeleton className=" w-[60%] h-4" />
        </div>
      </div>
    </div>
  );
};

export const AdjustmentSkeletonGroup = () => {
  return (
    <div className="w-full h-full flex flex-col overflow-y-auto p-2">
      <AdjustmentSkeleton />
      <AdjustmentSkeleton />
      <AdjustmentSkeleton />
      <AdjustmentSkeleton />
      <AdjustmentSkeleton />
      <AdjustmentSkeleton />
    </div>
  );
};
