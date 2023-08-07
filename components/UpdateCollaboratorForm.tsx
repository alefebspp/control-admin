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
  FormMessage,
  FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

import { updateCollaboratorSchema } from '@/lib/schemas';
import { AppError } from '@/lib/AppError';
import { formatTimeInput } from '@/utils/masks';
import { useCollaboratorService } from '@/hooks/useCollaboratorService';
import { Collaborator } from '@/services/collaborator/interface';

interface UpdateCollaboratorFormProps {
  collaborator: Collaborator;
}

const UpdateCollaboratorForm = ({
  collaborator
}: UpdateCollaboratorFormProps) => {
  const { useUpdateCollaboratorMutation } = useCollaboratorService();
  const { mutateAsync: updateCollaborator, isLoading } =
    useUpdateCollaboratorMutation();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateCollaboratorSchema>>({
    resolver: zodResolver(updateCollaboratorSchema),
    defaultValues: {
      name: collaborator.name,
      surname: collaborator.surname,
      email: collaborator.email,
      shift_start: collaborator.shift_start,
      shift_end: collaborator.shift_end,
      interval_start: collaborator.interval_start,
      interval_end: collaborator.interval_end
    }
  });

  const shiftStartValue = form.watch('shift_start');
  const shiftEndValue = form.watch('shift_end');
  const intervalStartValue = form.watch('interval_start');
  const intervalEndValue = form.watch('interval_end');

  async function handleUpdateCollaborator(
    data: z.infer<typeof updateCollaboratorSchema>
  ) {
    try {
      const updatedCollaborator = await updateCollaborator({
        id: collaborator.id,
        ...data
      });
      toast({
        title: `Colaborador ${updatedCollaborator.name} atualizado com sucesso!`,
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
  }

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
          onSubmit={form.handleSubmit(handleUpdateCollaborator)}
          className="w-full h-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input className="bg-gray-300 shadow-md" {...field} />
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
                <FormLabel>Sobrenome</FormLabel>
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
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="bg-gray-300 shadow-md" {...field} />
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
                <FormLabel>Horário de entrada</FormLabel>
                <FormControl>
                  <Input className="bg-gray-300 shadow-md" {...field} />
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
                <FormLabel>Início de intervalo</FormLabel>
                <FormControl>
                  <Input className="bg-gray-300 shadow-md" {...field} />
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
                <FormLabel>Fim de intervalo</FormLabel>
                <FormControl>
                  <Input className="bg-gray-300 shadow-md" {...field} />
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
                <FormLabel>Horário de saída</FormLabel>
                <FormControl>
                  <Input className="bg-gray-300 shadow-md" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button isLoading={isLoading} type="submit" className="w-full">
            Atualizar
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export { UpdateCollaboratorForm };
