'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { MapPin } from 'lucide-react';

export const DashboardSkeleton = () => {
  return (
    <div className="w-full h-full flex gap-4 p-4 bg-gray-400">
      <div className="w-[50%] h-full flex flex-col gap-4">
        <div className="w-full h-[10%] flex items-end justify-start gap-4 p-2 rounded-xl bg-white">
          <Skeleton className="w-[40%] h-10" />
          <Skeleton className="w-[40%] h-10" />
        </div>
        <RegistrySkeleton />
        <RegistrySkeleton />
        <RegistrySkeleton />
        <RegistrySkeleton />
        <RegistrySkeleton />
        <RegistrySkeleton />
        <RegistrySkeleton />
        <RegistrySkeleton />
      </div>
      <div className="w-[50%] h-full flex flex-col gap-4">
        <div className="w-full h-[50%] bg-white rounded-md">
          <Skeleton className="w-full h-[10%] rounded-none rounded-tl-md rounded-tr-md" />
          <div className="w-full h-[90%] flex justify-center items-center">
            <MapPin
              className="w-[50%] h-[50%] m-auto animate-pulse"
              color="#c8ced5"
            />
          </div>
        </div>
        <div className="w-full h-[50%] bg-white rounded-md">
          <ChartSkeleton />
        </div>
      </div>
    </div>
  );
};

export const ChartSkeleton = ({
  loadingApp = true
}: {
  loadingApp?: boolean;
}) => {
  return (
    <div className="w-full h-full flex flex-col p-2">
      {loadingApp ? (
        <div className="w-full h-[10%] flex items-center justify-start gap-2">
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-[30%] h-[50%]" />
        </div>
      ) : null}
      <div className="w-full h-[90%] flex justify-center items-center">
        <div className="w-full h-[50%] flex items-end justify-center gap-4">
          <Skeleton className="w-[10%] h-full" />
          <Skeleton className="w-[10%] h-[60%]" />
          <Skeleton className="w-[10%] h-[40%]" />
        </div>
      </div>
    </div>
  );
};

const RegistrySkeleton = () => {
  return (
    <div className="w-full h-[10%] flex justify-between bg-white p-2 rounded-xl">
      <div className="w-[15%] h-full flex flex-col items-center justify-between">
        <Skeleton className="w-[50px] h-[50px] rounded-full" />
      </div>
      <div className="w-[80%] h-full flex flex-col justify-start">
        <Skeleton className="w-full h-[40%] flex justify-between rounded-lg" />
      </div>
    </div>
  );
};
