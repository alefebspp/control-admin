import { CreateCollaboratorFormSkeleton } from '@/components/CreateCollaboratorForm';
import { Skeleton } from '@/components/ui/skeleton';

export default function PageSkeleton() {
  return (
    <div className="w-full h-full flex justify-between items-center">
      <CreateCollaboratorFormSkeleton />
      <div className="w-[48%] h-full flex flex-col gap-4 p-2 bg-white rounded-md">
        <div className="w-full flex items-end gap-2">
          <Skeleton className="w-10 h-10" />
          <Skeleton className="w-32 h-5" />
        </div>
        <div className="lg:w-full xl:w-[60%] h-[80%] flex flex-col p-2">
          <Skeleton className="w-full h-10 mb-4" />
          <Skeleton className="w-full h-10 mb-4" />
          <Skeleton className="w-full h-10 mb-4" />
          <Skeleton className="w-full h-10 mb-4" />
          <Skeleton className="w-full h-10 mb-4" />
          <Skeleton className="w-full h-10 mb-4" />
          <Skeleton className="w-full h-10 mb-4" />
          <Skeleton className="w-full h-10 mb-4" />
          <Skeleton className="w-full h-10 mb-4" />
        </div>
      </div>
    </div>
  );
}
