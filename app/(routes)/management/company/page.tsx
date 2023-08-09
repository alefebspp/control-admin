'use client';

import { useEffect } from 'react';
import { AtSign, CaseUpper, ImagePlus } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { CompanyLogo } from '@/components/CompanyLogo';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useCompanyService } from '@/hooks/useCompanyService';
import { companySchema } from '@/lib/schemas';
import CompanySkeleton from './skeleton';
import { useToast } from '@/components/ui/use-toast';
import { AppError } from '@/lib/AppError';

const Company = () => {
  const { toast } = useToast();

  const { useFindCompanyQuery, useUpdateCompanyMutation } = useCompanyService();

  const { data: company, isLoading } = useFindCompanyQuery();
  const { mutateAsync: updateCompany, isLoading: updatingCompany } =
    useUpdateCompanyMutation();

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema)
  });

  useEffect(() => {
    if (company) {
      form.setValue('name', company.name);
      form.setValue('email', company.email);
    }
  }, [company]);

  const handleUpdateCompany = async (data: z.infer<typeof companySchema>) => {
    try {
      const updatedCompany = await updateCompany({
        body: { ...data },
        company_id: company.id
      });

      toast({
        title: `Empresa atualizada com sucesso`,
        variant: 'success'
      });
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível fazer atualizar colaborador';

      toast({
        title: title,
        description: 'Por favor, tente novamente.',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return <CompanySkeleton />;
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-4">
      <div className="w-[150px] h-[150px] rounded-full relative">
        <CompanyLogo source={company?.logo} className="w-[150px] h-[150px]" />
        <Button className="w-[50px] h-[50px] rounded-full bg-white absolute bottom-0 right-0">
          <ImagePlus className="text-green-500 w-16 h-16" />
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateCompany)}
          className="w-full h-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-[40%] mx-auto">
                <FormLabel>
                  <CaseUpper />
                </FormLabel>
                <FormControl>
                  <Input className="bg-gray-300 shadow-md" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-[40%] mx-auto">
                <FormLabel>
                  <AtSign />
                </FormLabel>
                <FormControl>
                  <Input className="bg-gray-300 shadow-md" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            isLoading={updatingCompany}
            type="submit"
            className="w-[40%] mx-auto mt-4"
          >
            Atualizar
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Company;
