'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';

import { Registry } from '@/components/Registry';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/Select';
import { RegistryLocations } from '@/components/RegistryLocations';
import { Chart } from '@/components/Chart';

import { months } from '@/utils';
import { useLisRegistriesQuery } from '@/hooks/userRegistryService';
import { useAuthContext } from '@/context/AuthContext';
import { DashboardSkeleton } from '@/layout/skeletons/dashboard';
import { Registry as RegistryInterface } from '@/services/registry/interface';
import { Statistics } from '@/components/Statistics';

const Home = () => {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(
    `0${currentDate.getMonth() + 1}-01`
  );
  const [selectedRegistry, setSelectedRegistry] = useState<
    RegistryInterface | undefined
  >();
  const { user } = useAuthContext();

  const { data: registries, isLoading } = useLisRegistriesQuery(
    user?.user_company
  );

  const registriesIsEmpty = registries?.length == 0;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="w-full h-full flex justify-between p-4 gap-4 bg-gray-300">
      <div className="w-[50%] h-full flex flex-col gap-4">
        <div className="w-full h-[10%] flex flex-col justify-between border border-slate-400 bg-white rounded-xl p-2">
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
        <div className="w-full h-full flex flex-col gap-4 p-2 overflow-y-auto">
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
