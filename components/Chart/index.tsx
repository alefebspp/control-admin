'use client';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer
} from 'recharts';
import { BarChart4 } from 'lucide-react';

import { ChartSkeleton } from '@/layout/skeletons/dashboard';
import { useListCollaboratorStatistics } from '@/hooks/userRegistryService';

import { ChartProps } from './interface';

export const Chart = ({ month, collaborator_id }: ChartProps) => {
  if (!collaborator_id) {
    return <NoRegistrySelected />;
  }

  const currentDate = new Date();

  const { data: statistics, isLoading } = useListCollaboratorStatistics(
    collaborator_id,
    `${currentDate.getFullYear()}-${month}`
  );

  const totalAditionalHours = statistics?.aditionalHours.value ?? 0;
  const totalPendingHours = statistics?.pendingHours.value ?? 0;
  const monthLabel = statistics?.monthLabel;

  const data = [
    {
      name: monthLabel,
      uv: totalPendingHours,
      pv: totalAditionalHours,
      amt:
        totalAditionalHours > totalPendingHours
          ? totalAditionalHours
          : totalPendingHours
    }
  ];

  if (isLoading) {
    return <ChartSkeleton loadingApp={false} />;
  }

  return (
    <ResponsiveContainer width="80%" height="80%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar barSize={40} dataKey="pv" name="Horas extras" fill="#32CD32" />
        <Bar barSize={40} dataKey="uv" name="Horas pendentes" fill="#880808" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const NoRegistrySelected = () => {
  return (
    <div className="bg-white w-full h-full rounded-br-md rounded-bl-md flex justify-center items-center">
      <div className="w-[50%] h-[50%] flex flex-col items-center">
        <BarChart4 className="w-[80%] h-[80%] text-slate-400" />
        <p className="text-slate-900 font-medium">
          Nenhum registro selecionado...
        </p>
      </div>
    </div>
  );
};
