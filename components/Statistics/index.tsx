'use client';
import { BarChart4 } from 'lucide-react';
import { StatisticsProps } from './interface';

export const Statistics = ({ selectedRegistry, chart }: StatisticsProps) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[10%] p-2 flex items-center justify-start gap-2 rounded-tl-md rounded-tr-md">
        <BarChart4 className="w-6 h-6" />
        <p className="font-medium">
          Estatísticas
          {selectedRegistry
            ? ` - ${selectedRegistry.collaborator.name} ${selectedRegistry.collaborator.surname}`
            : ''}
        </p>
      </div>
      <div className="w-full h-[90%] flex justify-center items-center p-2 rounded-bl-md rounded-br-md">
        {chart}
      </div>
    </div>
  );
};
