import { Skeleton } from '@/components/ui/skeleton';

const CompanySkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-4">
      <div className="w-full h-full flex flex-col justify-start items-center gap-4 ">
        <Skeleton className="w-[150px] h-[150px] rounded-full" />
        <Skeleton className="w-[40%] h-[8%]" />
        <Skeleton className="w-[40%] h-[8%]" />
        <Skeleton className="w-[40%] h-[8%]" />
      </div>
    </div>
  );
};

export default CompanySkeleton;
