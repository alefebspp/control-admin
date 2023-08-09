'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from './ui/skeleton';

import { createCollaboratorSchema } from '@/lib/schemas';
import { AppError } from '@/lib/AppError';
import { formatTimeInput } from '@/utils/masks';
import { useCollaboratorService } from '@/hooks/useCollaboratorService';
import { useAuthContext } from '@/context/AuthContext';
import { Checkbox } from './ui/checkbox';

const CreateCollaboratorForm = () => {
  const { user } = useAuthContext();

  const { useCreateCollaboratorMutation } = useCollaboratorService();
  const { mutateAsync: createCollaborator, isLoading } =
    useCreateCollaboratorMutation();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof createCollaboratorSchema>>({
    resolver: zodResolver(createCollaboratorSchema),
    defaultValues: {
      manager: false
    }
  });

  const shiftStartValue = form.watch('shift_start');
  const shiftEndValue = form.watch('shift_end');
  const intervalStartValue = form.watch('interval_start');
  const intervalEndValue = form.watch('interval_end');

  const { isSubmitSuccessful } = form.formState;

  async function handleCreateCollaborator(
    data: z.infer<typeof createCollaboratorSchema>
  ) {
    try {
      await createCollaborator({ company_id: user?.user_company, ...data });
      toast({
        title: 'Colaborador criado com sucesso!',
        variant: 'success'
      });
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi possível fazer login';

      toast({
        title: title,
        description: 'Por favor, tente novamente.',
        variant: 'destructive'
      });
    }
  }

  useEffect(() => {
    form.reset({
      name: '',
      surname: '',
      email: '',
      password: '',
      shift_start: '',
      shift_end: '',
      interval_start: '',
      interval_end: ''
    });
  }, [isSubmitSuccessful]);

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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateCollaborator)}
          className="lg:w-full xl:w-[60%] h-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-gray-300 shadow-md"
                    placeholder="Nome"
                    {...field}
                  />
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
                  <Input
                    className="bg-gray-300 shadow-md"
                    placeholder="Sobrenome"
                    {...field}
                  />
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
                  <Input
                    className="bg-gray-300 shadow-md"
                    placeholder="Email"
                    {...field}
                  />
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
                  <Input
                    className="bg-gray-300 shadow-md"
                    placeholder="Senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shift_start"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-gray-300 shadow-md"
                    placeholder="Horário de entrada"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interval_start"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-gray-300 shadow-md"
                    placeholder="Início de intervalo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interval_end"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-gray-300 shadow-md"
                    placeholder="Fim de intervalo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shift_end"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-gray-300 shadow-md"
                    placeholder="Horário de saída"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="manager"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Marque para o colaborador ser um gestor</FormLabel>
              </FormItem>
            )}
          />
          <Button isLoading={isLoading} type="submit" className="w-full">
            Adicionar
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

const CreateCollaboratorFormSkeleton = () => {
  return (
    <div className="w-[48%] h-full flex flex-col gap-4 p-2 bg-white rounded-md">
      <div className="w-full flex items-end gap-2">
        <Skeleton className="w-10 h-10" />
        <Skeleton className="w-32 h-5" />
      </div>
      <div className="w-full h-full p-2">
        <div className="lg:w-full xl:w-[60%] h-full flex flex-col gap-4">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </div>
      </div>
    </div>
  );
};

export { CreateCollaboratorForm, CreateCollaboratorFormSkeleton };
