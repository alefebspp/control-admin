'use client';
import { ChangeEvent, useState } from 'react';
import { Loader2, Search } from 'lucide-react';

import { Registry } from '@/components/Registry';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/Select';
import { RegistryLocations } from '@/components/RegistryLocations';
import { Chart } from '@/components/Chart';

import { months } from '@/utils';
import { useLisRegistriesQuery } from '@/hooks/userRegistryService';
import { useAuthContext } from '@/context/AuthContext';
import { Registry as RegistryInterface } from '@/services/registry/interface';
import { Statistics } from '@/components/Statistics';
import { Pagination } from '@/components/Pagination';

const Home = () => {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(
    `0${currentDate.getMonth() + 1}-01`
  );
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [collaboratorName, setCollaboratorName] = useState<string>('');
  const [selectedRegistry, setSelectedRegistry] = useState<
    RegistryInterface | undefined
  >();
  const [skipParam, setSkipParam] = useState<number>(0);
  const { user } = useAuthContext();

  const periodFilter = `${currentDate.getFullYear()}-${selectedMonth}`;

  const { registries, count, isLoading, isEmpty } = useLisRegistriesQuery(
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
        <div className="w-full h-[10%] flex flex-col justify-between gap-2 border border-slate-400 bg-white rounded-xl p-2">
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
          <div className="w-full h-full flex flex-col p-2 overflow-y-auto">
            <div>
              {registries?.map(registry => {
                return (
                  <Registry
                    setSelectedRegistry={setSelectedRegistry}
                    selectedRegistry={selectedRegistry}
                    registry={registry}
                  />
                );
              })}
            </div>
          </div>
        )}
        <Pagination skip={skipParam} setSkip={setSkipParam} count={count} />
      </div>
      <div className="w-[50%] h-full flex flex-col gap-4">
        <div className="w-full h-[50%] border border-slate-400 rounded-md">
          <RegistryLocations registry={selectedRegistry} />
        </div>
        <div className="w-full h-[50%] flex flex-col rounded-md bg-white border border-slate-400">
          <Statistics
            selectedRegistry={selectedRegistry}
            chart={
              <Chart
                month={selectedMonth}
                collaborator_id={selectedRegistry?.collaborator_id}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
