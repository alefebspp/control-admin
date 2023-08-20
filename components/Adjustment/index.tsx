'use client';

import { Check, X, Clock } from 'lucide-react';
import { AdjustmentProps } from './interface';

import { convertRegistryType, convertStatusLabel } from '@/utils/maps';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { UserAvatar } from '../UserAvatar';
import { formatDateToDayMonth } from '@/utils';

interface StatusColors {
  text: string;
  backGround: string;
}

export const Adjustment = ({
  adjustment,
  selectedAdjustment,
  setSelectedAdjustment
}: AdjustmentProps) => {
  const [statusColors, setStatusColors] = useState<StatusColors>({
    text: '',
    backGround: ''
  });

  const {
    status,
    collaborator,
    registry,
    registry_type,
    new_value,
    previous_value
  } = adjustment;

  const defineStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'PENDING':
        setStatusColors({
          text: 'text-orange-400',
          backGround: 'bg-orange-400'
        });
        break;
      case 'ACCEPTED':
        setStatusColors({
          text: 'text-green-500',
          backGround: 'bg-green-500'
        });
        break;
      case 'REJECTED':
        setStatusColors({
          text: 'text-red-500',
          backGround: 'bg-red-500'
        });
        break;
    }
  };

  const activeAdjustment = adjustment.id == selectedAdjustment?.id;

  const handleSelectAdjustment = () => {
    setSelectedAdjustment(adjustment);
  };

  useEffect(() => {
    defineStatusColor(status);
  }, [adjustment]);

  return (
    <div
      onClick={handleSelectAdjustment}
      className={cn(
        'w-full h-[18%] bg-white flex cursor-pointer border border-slate-400 hover:ring hover:ring-slate-300',
        activeAdjustment && 'ring-0 hover:ring-0'
      )}
    >
      <StatusContainer
        activeAdjustment={activeAdjustment}
        statusColors={statusColors}
        status={status}
      />
      <div className="w-[20%] h-full flex flex-col p-2">
        <div className="w-full h-[20%] flex justify-center items-center">
          <p className="text-sm">Solicitante</p>
        </div>
        <div className="w-full h-[80%] flex flex-col justify-center items-center gap-2">
          <UserAvatar className="w-8 h-8" source={collaborator.avatar} />
          <p className="text-xs font-medium">{collaborator.name}</p>
        </div>
      </div>
      <div className="w-[20%] h-full flex flex-col p-2">
        <div className="w-full h-[20%] flex justify-center items-center">
          <p className="text-sm">Data do registro</p>
        </div>
        <div className="w-full h-[80%] flex flex-col justify-center items-center gap-2">
          <p className="text-sm font-medium">
            {formatDateToDayMonth(registry.date)}
          </p>
        </div>
      </div>
      <div className="w-[20%] h-full flex flex-col p-2">
        <div className="w-full h-[20%] flex justify-center items-center">
          <p className="text-sm">Correção em</p>
        </div>
        <div className="w-full h-[80%] flex flex-col justify-center items-center gap-2">
          <p className="text-sm font-medium">
            {convertRegistryType(registry_type)}
          </p>
        </div>
      </div>
      <div className="w-[25%] h-full flex flex-col p-2">
        <div className="w-full h-[20%] flex justify-center items-center">
          <p className="text-sm">Anterior / Novo</p>
        </div>
        <div className="w-full h-[80%] flex flex-col justify-center items-center gap-2">
          <p className="text-sm font-medium">
            {`${previous_value ?? '--'} / ${new_value}`}
          </p>
        </div>
      </div>
    </div>
  );
};

const StatusContainer = ({
  status,
  statusColors,
  activeAdjustment
}: {
  status?: string;
  statusColors: StatusColors;
  activeAdjustment: boolean;
}) => {
  const statusLabel = convertStatusLabel(status);
  const iconColor = activeAdjustment ? 'white' : 'black';

  const defineStatusIcon = (status: string | undefined) => {
    switch (status) {
      case 'PENDING':
        return <Clock color={iconColor} />;
      case 'ACCEPTED':
        return <Check color={iconColor} />;
      case 'REJECTED':
        return <X color={iconColor} />;
    }
  };

  return (
    <div
      className={cn(
        'w-[15%] h-full flex flex-col justify-center items-center gap-2',
        activeAdjustment && statusColors.backGround
      )}
    >
      {defineStatusIcon(status)}
      <p
        className={cn(
          'text-sm font-medium',
          statusColors.text,
          activeAdjustment && 'text-white'
        )}
      >
        {statusLabel}
      </p>
    </div>
  );
};
