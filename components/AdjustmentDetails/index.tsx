'use client';

import { useState } from 'react';
import {
  Check,
  CheckCircle,
  MapPin,
  MessageCircle,
  Pencil,
  User,
  X
} from 'lucide-react';

import { useValidateAdjustmentMutation } from '@/hooks/useAdjustmentService';
import { AdjustmentDetailsProps } from './interface';
import { Button } from '../ui/button';
import { useAuthContext } from '@/context/AuthContext';
import { useToast } from '../ui/use-toast';
import { UserAvatar } from '../UserAvatar';
import { cn } from '@/lib/utils';
import { Adjustment } from '@/services/adjustment/interface';
import { adjustmentMock } from '@/utils/mocks';

export const AdjustmentDetails = ({
  selectedAdjustment,
  setSelectedAdjustment
}: AdjustmentDetailsProps) => {
  if (!selectedAdjustment) {
    return <NoAdjustmentSelected />;
  }
  const [newStatus, setNewStatus] = useState<string | undefined>();
  const { toast } = useToast();

  const { user } = useAuthContext();

  const {
    collaborator,
    new_location,
    registry_location,
    reason,
    id,
    status,
    adjustment_reviewer
  } = selectedAdjustment;

  const { mutateAsync: validateAdjustment, isLoading } =
    useValidateAdjustmentMutation();

  const handleValidateAdjustment = async (new_status: string) => {
    try {
      setNewStatus(new_status);
      const adjustment = await validateAdjustment({
        adjustment_id: id,
        validate_data: { reviewer: user?.user_id, new_status }
      });
      if (setSelectedAdjustment) {
        setSelectedAdjustment(adjustment);
      }
    } catch (error) {
      toast({
        title: 'Impossível avaliar ajuste.Tente novamente',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="w-full h-full p-2">
      <div className="w-full h-[20%] flex flex-col">
        <div className="w-full flex items-end mb-4 mt-2 gap-2">
          <User className="w-[30px] h-[30px] text-gray-500" />
          <p className="text-gray-500 font-medium">Colaborador</p>
        </div>
        <div className="w-full flex gap-2">
          <div className="flex flex-col w-[50%] items-start gap-1.5">
            <p className="text-xs text-slate-500">Nome</p>
            <div className="w-full h-10 flex items-center justify-start rounded-md p-2 bg-slate-200 text-slate-500 font-medium text-xs">
              {collaborator.name} {collaborator.surname}
            </div>
          </div>
          <div className="w-[50%] flex justify-between">
            <div className="flex flex-col w-[20%] items-start gap-1.5">
              <p className="text-xs text-slate-500 m-auto">Entrada</p>
              <div className="w-full h-10 flex items-center justify-center rounded-md p-2 bg-slate-200 text-slate-500 font-medium text-xs">
                {collaborator.shift_start}
              </div>
            </div>
            <div className="flex flex-col w-[20%] items-start gap-1.5">
              <p className="text-xs text-slate-500 m-auto">I.Intervalo</p>
              <div className="w-full h-10 flex items-center justify-center rounded-md p-2 bg-slate-200 text-slate-500 font-medium text-xs">
                {collaborator.interval_start}
              </div>
            </div>
            <div className="flex flex-col w-[20%] items-start gap-1.5">
              <p className="text-xs text-slate-500 m-auto">F.Intervalo</p>
              <div className="w-full h-10 flex items-center justify-center rounded-md p-2 bg-slate-200 text-slate-500 font-medium text-xs">
                {collaborator.interval_end}
              </div>
            </div>
            <div className="flex flex-col w-[20%] items-start gap-1.5">
              <p className="text-xs text-slate-500 m-auto">Saída</p>
              <div className="w-full h-10 flex items-center justify-center rounded-md p-2 bg-slate-200 text-slate-500 font-medium text-xs">
                {collaborator.shift_end}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[25%] flex flex-col">
        <div className="w-full flex items-end my-4 gap-2">
          <MapPin className="w-[30px] h-[30px] text-gray-500" />
          <p className="text-gray-500 font-medium">Locais do ajuste</p>
        </div>
        <div className="w-full flex gap-2">
          <div className="flex flex-col w-[50%] items-start gap-1.5">
            <p className="text-xs text-slate-500">Local anterior</p>
            <div className="w-full h-12 rounded-md p-2 bg-slate-200 text-slate-500 font-medium text-xs">
              {registry_location}
            </div>
          </div>
          <div className="flex flex-col w-[50%] items-start gap-1.5">
            <p className="text-xs text-slate-500">Novo local</p>
            <div className="w-full h-12 rounded-md p-2 bg-slate-200 text-slate-500 font-medium text-xs">
              {new_location}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[20%] flex flex-col">
        <div className="w-full flex items-end my-4 gap-2">
          <MessageCircle className="w-[30px] h-[30px] text-gray-500" />
          <p className="text-gray-500 font-medium">Motivação</p>
        </div>
        <div className="w-full flex gap-2">
          <div className="w-full h-14 rounded-md p-2 bg-slate-200 text-slate-500 font-medium text-xs">
            {reason}
          </div>
        </div>
      </div>
      <div className="w-full h-[35%] flex flex-col">
        <div className="w-full flex items-end my-4 gap-2">
          <CheckCircle className="w-[30px] h-[30px] text-gray-500" />
          {status == 'PENDING' ? (
            <p className="text-gray-500 font-medium">Avalie o ajuste</p>
          ) : (
            <p className="text-gray-500 font-medium">Avaliado por:</p>
          )}
        </div>
        <div
          className={cn(
            'w-full h-full flex items-center gap-2',
            status == 'PENDING' ? 'justify-around' : 'flex-col justify-center'
          )}
        >
          {status == 'PENDING' ? (
            <>
              <Button
                isLoading={isLoading && newStatus == 'ACCEPTED'}
                onClick={() => handleValidateAdjustment('ACCEPTED')}
                className="w-[30%] h-14 rounded-3xl"
              >
                <Check className="mr-2" />
                Aceitar
              </Button>
              <Button
                isLoading={isLoading && newStatus == 'REJECTED'}
                onClick={() => handleValidateAdjustment('REJECTED')}
                className="w-[30%] h-14 rounded-3xl"
              >
                <X className="mr-2" />
                Rejeitar
              </Button>
            </>
          ) : (
            <div className="w-full h-[80%] rounded-full bg-slate-200 flex items-center justify-start gap-2">
              <UserAvatar
                className="w-16 h-16 ml-6"
                source={adjustment_reviewer?.avatar}
              />
              <p className="text-slate-500 text-lg font-medium">
                {adjustment_reviewer?.name} {adjustment_reviewer?.surname}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NoAdjustmentSelected = () => {
  const selectedAdjustmentMock: Adjustment = adjustmentMock;
  return (
    <div className="w-full h-full relative">
      <div className="absolute w-full h-full backdrop-blur-sm rounded-md">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <Pencil className="w-[20%] h-[20%] text-slate-900" />
          <p className="text-slate-900 font-medium text-lg">
            Nenhuma solicitação selecionada...
          </p>
        </div>
      </div>
      <div className={cn('w-full h-full flex flex-col')}>
        <AdjustmentDetails selectedAdjustment={selectedAdjustmentMock} />
      </div>
    </div>
  );
};
