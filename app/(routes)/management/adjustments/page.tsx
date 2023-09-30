'use client';

import { Search, PenLine, Loader2 } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

import { SelectComponent } from '@/components/Select';
import { Input } from '@/components/ui/input';
import { Adjustment } from '@/components/Adjustment';

import { months } from '@/utils';
import { useListAdjustmentsQuery } from '@/hooks/useAdjustmentService';
import { useAuthContext } from '@/context/AuthContext';
import { AdjustmentDetails } from '@/components/AdjustmentDetails';
import { Adjustment as AdjustmentInterface } from '@/services/adjustment/interface';
import { Pagination } from '@/components/Pagination';

const Adjustments = () => {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(
    `0${currentDate.getMonth() + 1}-01`
  );
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [collaboratorName, setCollaboratorName] = useState<string>('');
  const [selectedAdjustment, setSelectedAdjustment] = useState<
    AdjustmentInterface | undefined
  >();
  const [skipParam, setSkipParam] = useState<number>(0);

  const periodFilter = `${currentDate.getFullYear()}-${selectedMonth}`;

  const { user } = useAuthContext();
  const { adjustments, isLoading, count, isEmpty } = useListAdjustmentsQuery(
    user?.user_company,
    periodFilter,
    collaboratorName,
    skipParam
  );

  const handleCollaboratorNameFilter = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        setCollaboratorName(event.target.value);
      }, 1000)
    );
  };

  return (
    <div className="w-full h-full flex justify-between p-4 gap-4">
      <div className="w-[50%] h-full flex flex-col gap-4">
        <div className="w-full h-[15%] flex flex-col justify-between gap-2 border border-slate-400 bg-white rounded-xl p-2">
          <div className="w-full h-[20%] flex items-center gap-2">
            <Search className="w-4 h-4" />
            <p className="font-medium lg:text-sm">Buscar por:</p>
          </div>
          <div className="w-full h-[80%] flex items-center justify-start gap-4">
            <SelectComponent
              setSelectedOption={setSelectedMonth}
              options={months}
              placeholder="Mês"
              defaultValue={selectedMonth}
            />
            <Input
              type="text"
              onChange={handleCollaboratorNameFilter}
              placeholder="Nome do colaborador"
              className="w-[40%] lg:h-[60%] xl:h-[80%] border border-slate-700"
            />
          </div>
        </div>
        {isLoading ? (
          <Loader2 className="h-6 w-6 text-blue-500 animate-spin mx-auto" />
        ) : (
          <div className="w-full h-full flex flex-col overflow-y-auto p-2 ">
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
        )}
        <Pagination skip={skipParam} setSkip={setSkipParam} count={count} />
      </div>
      <div className="w-[50%] h-full flex flex-col p-2  bg-white rounded-md border border-slate-400">
        <div className="w-full h-[6%]  flex items-end gap-2">
          <PenLine className="xl:w-10 lg:w-8 xl:h-10 lg:h-8" />
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
