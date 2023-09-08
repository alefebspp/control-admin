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
        'w-full h-[100px] flex justify-between bg-white  border-b border-slate-400 text-slate-600 hover:text-blue-500 cursor-pointer',
        selected && ' text-blue-500'
      )}
    >
      <div
        className={cn(
          'lg:w-[20%] xl:w-[15%] h-full flex flex-col items-center justify-center gap-2',
          selected && 'bg-blue-500 text-white'
        )}
      >
        <UserAvatar
          className="lg:w-8 lg:h-8  xl:w-10 xl:h-10"
          source={collaborator.avatar}
        />
        <p className="font-medium text-xs text-center">{`${collaborator.name} ${
          collaborator.surname.split(' ')[0]
        }`}</p>
      </div>
      <div className="lg:w-[75%] xl:w-[80%] h-full flex flex-col justify-between  py-2 pr-2">
        <div className="w-full h-[40%] flex justify-between border border-slate-600 text-slate-600 rounded-lg">
          <div className="h-full w-[20%] flex justify-start justify-center items-end">
            <p className=" lg:text-xs xl:text-sm">Data</p>
          </div>
          <div className="h-full w-[20%] flex justify-start justify-center items-end">
            <p className=" lg:text-xs xl:text-sm">Entrada</p>
          </div>
          <div className="h-full w-[20%] flex justify-start justify-center items-end">
            <p className=" lg:text-xs xl:text-sm">I.Intervalo</p>
          </div>
          <div className="h-full w-[20%] flex justify-start justify-center items-end">
            <p className=" lg:text-xs xl:text-sm">F.Intervalo</p>
          </div>
          <div className="h-full w-[20%] flex justify-start justify-center items-end">
            <p className=" lg:text-xs xl:text-sm">Saída</p>
          </div>
        </div>
        <div className="w-full h-[40%]  flex justify-between rounded-lg">
          <div className="h-full w-[20%] flex justify-start justify-center items-end">
            <p className="font-medium lg:text-xs xl:text-sm">
              {formatDateToDayMonth(date)}
            </p>
          </div>
          <div className="h-full w-[20%] flex justify-start justify-center items-end">
            <p className="font-medium lg:text-xs xl:text-sm">{start}</p>
          </div>
          <div className="h-full w-[20%] flex justify-start justify-center items-end">
            <p className="font-medium lg:text-xs xl:text-sm">
              {interval_start}
            </p>
          </div>
          <div className="h-full w-[20%] flex justify-start justify-center items-end">
            <p className="font-medium lg:text-xs xl:text-sm">{interval_end}</p>
          </div>
          <div className="h-full w-[20%] flex justify-start justify-center items-end">
            <p className="font-medium lg:text-xs xl:text-sm">{end}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
