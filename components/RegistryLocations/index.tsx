'use client';

import { MapPin, ChevronDown } from 'lucide-react';
import { HeaderProps, RegistryLocationsProps } from './interface';
import { cn } from '@/lib/utils';
import { formatDateToDayMonth } from '@/utils';

export const RegistryLocations = ({ registry }: RegistryLocationsProps) => {
  return (
    <div className={cn('w-full h-full flex flex-col')}>
      <Header registry={registry} />
      {registry ? <Content registry={registry} /> : <NoRegistrySelected />}
    </div>
  );
};

const Header = ({ registry }: HeaderProps) => {
  return (
    <div
      className={cn(
        'w-full h-[10%] p-2 flex justify-between items-center bg-slate-900 border-b border-slate-300 rounded-tl-md rounded-tr-md'
      )}
    >
      <div className="flex gap-2 items-center text-white">
        <MapPin className="w-4 h-4" />
        {!registry ? (
          'LOCAIS'
        ) : (
          <p className="text-sm font-medium">{`LOCAIS - ${
            registry?.collaborator.name
          } ${registry?.collaborator.surname} (${formatDateToDayMonth(
            registry?.date
          )})`}</p>
        )}
      </div>
      <ChevronDown className="w-6 h-6 text-white" />
    </div>
  );
};

export const NoRegistrySelected = () => {
  return (
    <div className="bg-white w-full h-full rounded-br-md rounded-bl-md flex justify-center items-center">
      <div className="w-[50%] h-[50%] flex flex-col items-center">
        <MapPin className="w-[80%] h-[80%] text-slate-400" />
        <p className="text-slate-900 font-medium">
          Nenhum registro selecionado...
        </p>
      </div>
    </div>
  );
};

export const Content = ({ registry }: RegistryLocationsProps) => {
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-bl-md rounded-br-md">
      <div className="w-full h-[25%] flex flex-col">
        <div className="w-full h-[30%] flex gap-2 items-center border-b p-2 border-slate-300">
          <MapPin className="w-4 h-4" />
          <p className="text-sm">Entrada</p>
        </div>
        <div className="w-full h-[70%] p-2">
          <p className="lg:text-xs xl:text-sm">{registry?.start_location}</p>
        </div>
      </div>
      <div className="w-full h-[25%] flex flex-col">
        <div className="w-full h-[30%] flex gap-2 items-center p-2 border-y border-slate-300">
          <MapPin className="w-4 h-4" />
          <p className="text-sm">I.Intervalo</p>
        </div>
        <div className="w-full h-[70%] p-2">
          <p className="lg:text-xs xl:text-sm">
            {registry?.interval_start_location}
          </p>
        </div>
      </div>
      <div className="w-full h-[25%] flex flex-col">
        <div className="w-full h-[30%] flex gap-2 items-center p-2 border-y border-slate-300">
          <MapPin className="w-4 h-4" />
          <p className="text-sm">F.Intervalo</p>
        </div>
        <div className="w-full h-[70%] p-2">
          <p className="lg:text-xs xl:text-sm">
            {registry?.interval_end_location}
          </p>
        </div>
      </div>
      <div className="w-full h-[25%] flex flex-col">
        <div className="w-full h-[30%] flex gap-2 items-center p-2 border-y border-slate-300">
          <MapPin className="w-4 h-4" />
          <p className="text-sm">Saída</p>
        </div>
        <div className="w-full h-[70%] p-2">
          <p className="lg:text-xs xl:text-sm">{registry?.end_location}</p>
        </div>
      </div>
    </div>
  );
};
