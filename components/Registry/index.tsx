'use client';
import { cn } from '@/lib/utils';
import { UserAvatar } from '../UserAvatar';
import { RegistryProps } from './interface';

import { formatDateToDayMonth } from '@/utils';

export const Registry = ({
  registry,
  selectedRegistry,
  setSelectedRegistry
}: RegistryProps) => {
  const { id, collaborator, start, interval_start, interval_end, end, date } =
    registry;

  const selected = id == selectedRegistry?.id;

  const selectRegistry = () => {
    setSelectedRegistry(registry);
  };

  if (!selectRegistry) {
    return <div>No selected registry</div>;
  }

  return (
    <div
      key={id}
      onClick={selectRegistry}
      className={cn(
        'w-full h-[10%] flex justify-between bg-white p-2 hover:ring hover:ring-blue-300 cursor-pointer',
        selected && 'ring ring-blue-300'
      )}
    >
      <div className="w-[15%] h-full flex flex-col items-center justify-between">
        <UserAvatar source={collaborator.avatar} />
        <p className="font-medium lg:text-xs xl:text-sm text-center">{`${collaborator.name} ${collaborator.surname}`}</p>
      </div>
      <div className="w-[80%] h-full flex flex-col justify-between">
        <div className="w-full h-[40%] flex justify-between bg-slate-900 rounded-lg">
          <div className="h-full w-[20%] flex justify-start justify-center items-end">
            <p className="text-white lg:text-xs xl:text-sm">Data</p>
          </div>
          <div className="h-full w-[20%] flex justify-start justify-center items-end">
            <p className="text-white lg:text-xs xl:text-sm">Entrada</p>
          </div>
          <div className="h-full w-[20%] flex justify-start justify-center items-end">
            <p className="text-white lg:text-xs xl:text-sm">I.Intervalo</p>
          </div>
          <div className="h-full w-[20%] flex justify-start justify-center items-end">
            <p className="text-white lg:text-xs xl:text-sm">F.Intervalo</p>
          </div>
          <div className="h-full w-[20%] flex justify-start justify-center items-end">
            <p className="text-white lg:text-xs xl:text-sm">Saída</p>
          </div>
        </div>
        <div className="w-full h-[40%] flex justify-between rounded-lg">
          <div className="h-full w-[20%] flex justify-start justify-center items-end border-r border-slate-300">
            <p className="font-medium">{formatDateToDayMonth(date)}</p>
          </div>
          <div className="h-full w-[20%] flex justify-start justify-center items-end border-r border-slate-300">
            <p className="font-medium">{start}</p>
          </div>
          <div className="h-full w-[20%] flex justify-start justify-center items-end border-r border-slate-300">
            <p className="font-medium">{interval_start}</p>
          </div>
          <div className="h-full w-[20%] flex justify-start justify-center items-end border-r border-slate-300">
            <p className="font-medium">{interval_end}</p>
          </div>
          <div className="h-full w-[20%] flex justify-start justify-center items-end">
            <p className="font-medium">{end}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
