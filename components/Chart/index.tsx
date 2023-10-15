'use client'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer
} from 'recharts'
import { BarChart4 } from 'lucide-react'

import { ChartSkeleton } from '@/layout/skeletons/dashboard'
import { useGetCollaboratorHourRecords } from '@/hooks/useHourRecordService'

import { ChartProps } from './interface'
import { cn } from '@/lib/utils'

export const Chart = ({ month, collaborator_id }: ChartProps) => {
  const currentDate = new Date()

  const { data: hourRecord, isLoading } = useGetCollaboratorHourRecords(
    collaborator_id,
    `${currentDate.getFullYear()}-${month}`
  )

  const totalAditionalHours = parseFloat(
    hourRecord?.additional.replace(':', '.') || ''
  )
  const totalPendingHours = parseFloat(
    hourRecord?.pending.replace(':', '.') || ''
  )

  const data = [
    {
      name: hourRecord?.monthLabel,
      uv: totalPendingHours,
      pv: totalAditionalHours,
      amt:
        hourRecord?.totalType == 'additional'
          ? hourRecord.additional
          : hourRecord?.pending
    }
  ]

  if (isLoading) {
    return <ChartSkeleton loadingApp={false} />
  }

  if (!collaborator_id) {
    return <NoRegistrySelected />
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
  )
}

export const NoRegistrySelected = () => {
  return (
    <div className="w-full h-full relative">
      <div className="absolute w-full h-full backdrop-blur-sm rounded-md">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <BarChart4 className="w-[30%] h-[30%] text-slate-900" />
        </div>
      </div>
      <div
        className={cn(
          'w-full h-full flex flex-col justify-center items-center gap-2'
        )}
      >
        <div className="w-[60%] h-[60%] flex justify-center items-end gap-4 border-b-2 border-l-2 border-gray-600">
          <div className="w-[10%] h-[80%] bg-green-500" />
          <div className="w-[10%] h-[50%] bg-red-500" />
        </div>
        <div className="w-[60%] h-[10%] flex items-center justify-center gap-4">
          <div className="w-[50%] h-full flex items-center justify-end gap-2">
            <div className="w-[10%] h-[50%] bg-green-500" />
            <p className="text-green-500">Horas extras</p>
          </div>
          <div className="w-[50%] h-full flex items-center gap-2">
            <div className="w-[10%] h-[50%] bg-red-500" />
            <p className="text-red-500">Horas extras</p>
          </div>
        </div>
      </div>
    </div>
  )
}
