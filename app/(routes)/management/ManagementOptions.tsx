'use client';
import LinkComponent from '@/components/LinkComponent';
import { Building, Pencil } from 'lucide-react';

const ManagementOptions = () => {
  return (
    <div className="w-full h-full flex items-end">
      <div className="lg:w-[15%] 2xl:w-[10%] lg:h-[80%] flex flex-col justify-end gap-2">
        <p className="font-medium">Empresa</p>
        <LinkComponent
          href="/management/company"
          className="h-[50%] w-[50%] justify-center items-center"
        >
          <Building className="w-8 h-8" />
        </LinkComponent>
      </div>
      <div className="lg:w-[15%] 2xl:w-[10%] lg:h-[80%] flex flex-col justify-end gap-2">
        <p className="font-medium">Ajustes</p>
        <LinkComponent
          href="/management/adjustments"
          className="h-[50%] w-[50%] justify-center items-center"
        >
          <Pencil className="w-8 h-8" />
        </LinkComponent>
      </div>
    </div>
  );
};

export { ManagementOptions };
