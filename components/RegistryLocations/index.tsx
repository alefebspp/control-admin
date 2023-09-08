'use client';

import { MapPin, ChevronDown } from 'lucide-react';
import { HeaderProps, RegistryLocationsProps } from './interface';
import { cn } from '@/lib/utils';
import { formatDateToDayMonth } from '@/utils';
import { Underdog } from 'next/font/google';

export const RegistryLocations = ({ registry }: RegistryLocationsProps) => {
  if (!registry) {
    return <NoRegistrySelected />;
  }

  return (
    <div className={cn('w-full h-full flex flex-col')}>
      <Header registry={registry} />
      <Content registry={registry} />
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
    <div className="w-full h-full relative">
      <div className="absolute w-full h-full backdrop-blur-sm rounded-md">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <MapPin className="w-[30%] h-[30%] text-slate-900" />
        </div>
      </div>
      <div className={cn('w-full h-full flex flex-col')}>
        <Header />
        <Content />
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
