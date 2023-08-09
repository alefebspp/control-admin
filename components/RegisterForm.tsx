'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

import { createCollaboratorSchema, companySchema } from '@/lib/schemas';
import { AppError } from '@/lib/AppError';
import { formatTimeInput } from '@/utils/masks';
import { createCollaborator } from '@/services/collaborator/collaborator.service';
import { createCompany } from '@/services/company/company.service';
import { RegistryCollaborator } from '@/services/collaborator/interface';
import { useAuthContext } from '@/context/AuthContext';

interface CollaboratorInfoProps {
  setCollaborator: Dispatch<SetStateAction<RegistryCollaborator | undefined>>;
}

interface CompanyInfoProps {
  collaborator: RegistryCollaborator;
}

const RegisterForm = () => {
  const [collaborator, setCollaborator] = useState<
    RegistryCollaborator | undefined
  >();

  return collaborator ? (
    <CompanyInfo collaborator={collaborator} />
  ) : (
    <CollaboratorInfo setCollaborator={setCollaborator} />
  );
};

const CompanyInfo = ({ collaborator }: CompanyInfoProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const { signIn } = useAuthContext();

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema)
  });

  async function handleRegistry(data: z.infer<typeof companySchema>) {
    try {
      setIsLoading(true);
      const { id } = await createCompany(data);

      await createCollaborator({
        company_id: id,
        admin: true,
        ...collaborator
      });

      await signIn({
        email: collaborator.email,
        password: collaborator.password
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível fazer login';
      toast({
        title: title,
        description: 'Por favor, tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollArea className="w-full h-full p-2">
      <div className="w-full gap-2 flex items-center">
        <h1 className="font-bold text-2xl">Informações da empresa</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegistry)}
          className="w-full h-full py-2 flex flex-col justify-around gap-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button isLoading={isLoading} type="submit" className="w-full">
            Criar conta
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

const CollaboratorInfo = ({ setCollaborator }: CollaboratorInfoProps) => {
  const form = useForm<z.infer<typeof createCollaboratorSchema>>({
    resolver: zodResolver(createCollaboratorSchema),
    defaultValues: {
      interval_start: '00:00',
      interval_end: '00:00',
      shift_start: '00:00',
      shift_end: '00:00',
      manager: false
    }
  });

  async function handleSetCollaborator(
    data: z.infer<typeof createCollaboratorSchema>
  ) {
    setCollaborator(data);
  }

  const shiftStartValue = form.watch('shift_start');
  const shiftEndValue = form.watch('shift_end');
  const intervalStartValue = form.watch('interval_start');
  const intervalEndValue = form.watch('interval_end');

  useEffect(() => {
    form.setValue('shift_start', formatTimeInput(shiftStartValue));
  }, [shiftStartValue]);

  useEffect(() => {
    form.setValue('shift_end', formatTimeInput(shiftEndValue));
  }, [shiftEndValue]);

  useEffect(() => {
    form.setValue('interval_start', formatTimeInput(intervalStartValue));
  }, [intervalStartValue]);

  useEffect(() => {
    form.setValue('interval_end', formatTimeInput(intervalEndValue));
  }, [intervalEndValue]);

  return (
    <ScrollArea className="w-full h-full p-2">
      <div className="w-full gap-2 flex items-center">
        <h1 className="font-bold text-2xl">Informações pessoais</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSetCollaborator)}
          className="w-full h-full py-2 flex flex-col justify-around gap-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Sobrenome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-5">
            Prosseguir
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export { RegisterForm };
