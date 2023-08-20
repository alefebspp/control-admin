'use client';

import { Search, PenLine } from 'lucide-react';
import { useState } from 'react';

import { SelectComponent } from '@/components/Select';
import { Input } from '@/components/ui/input';
import { Adjustment } from '@/components/Adjustment';

import { months } from '@/utils';
import { useListAdjustmentsQuery } from '@/hooks/useAdjustmentService';
import { useAuthContext } from '@/context/AuthContext';
import { AdjustmentDetails } from '@/components/AdjustmentDetails';
import { Adjustment as AdjustmentInterface } from '@/services/adjustment/interface';
import { ScrollArea } from '@/components/ui/scroll-area';

const Adjustments = () => {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(
    `0${currentDate.getMonth() + 1}-01`
  );
  const [selectedAdjustment, setSelectedAdjustment] = useState<
    AdjustmentInterface | undefined
  >();

  const { user } = useAuthContext();
  const { data: adjustments, isLoading } = useListAdjustmentsQuery(
    user?.user_company,
    `${currentDate.getFullYear()}-${selectedMonth}`
  );

  return (
    <div className="w-full h-full flex gap-4">
      <div className="w-[50%] h-full flex flex-col gap-4">
        <div className="w-full h-[15%] flex flex-col justify-between border border-slate-400 bg-white rounded-xl p-2">
          <div className="w-full h-[20%] flex items-center gap-2">
            <Search className="w-4 h-4" />
            <p className="font-medium">Buscar por:</p>
          </div>
          <div className="w-full h-[80%] flex items-center justify-start gap-4">
            <SelectComponent
              setSelectedOption={setSelectedMonth}
              options={months}
              placeholder="Mês"
              defaultValue={selectedMonth}
            />
            <Input
              placeholder="Nome do colaborador"
              className="w-[40%] border border-slate-700"
            />
          </div>
        </div>
        <div className="w-full h-full flex flex-col gap-4 overflow-y-auto p-2">
          {adjustments?.map(adjustment => {
            return (
              <Adjustment
                selectedAdjustment={selectedAdjustment}
                setSelectedAdjustment={setSelectedAdjustment}
                adjustment={adjustment}
              />
            );
          })}
        </div>
      </div>
      <div className="w-[50%] h-full flex flex-col p-2  bg-white rounded-md border border-slate-400">
        <div className="w-full h-[6%]  flex items-end gap-2">
          <PenLine className="w-10 h-10" />
          <p className="text-lg font-medium">Detalhes</p>
        </div>
        <AdjustmentDetails
          setSelectedAdjustment={setSelectedAdjustment}
          selectedAdjustment={selectedAdjustment}
        />
      </div>
    </div>
  );
};

export default Adjustments;
