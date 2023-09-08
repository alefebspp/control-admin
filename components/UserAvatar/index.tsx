'use client';

import { Loader2, RefreshCw, UserCircle } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useAuthContext } from '@/context/AuthContext';
import { useCollaboratorService } from '@/hooks/useCollaboratorService';
import { useToast } from '../ui/use-toast';
import { cn } from '@/lib/utils';

export interface AvatarProps {
  source?: string | null;
  className?: string;
  canUpdate?: boolean;
}

export const UserAvatar = ({
  source,
  className,
  canUpdate = false
}: AvatarProps) => {
  return source ? (
    canUpdate ? (
      <div className={cn(className, 'relative w-12 h-12')}>
        <Avatar className={className}>
          <AvatarImage src={source} />
          <AvatarFallback>
            <Skeleton className={className} />
          </AvatarFallback>
        </Avatar>
        <ChangeAvatarButton />
      </div>
    ) : (
      <Avatar className={className}>
        <AvatarImage src={source} />
        <AvatarFallback>
          <Skeleton className={className} />
        </AvatarFallback>
      </Avatar>
    )
  ) : canUpdate ? (
    <div className={cn(className, 'relative w-12 h-12')}>
      <UserCircle className={cn(className, 'relative mx-auto')} />
      <ChangeAvatarButton />
    </div>
  ) : (
    <UserCircle className={className} />
  );
};

const ChangeAvatarButton = () => {
  const { user } = useAuthContext();
  const { useChangeAvatarMutation } = useCollaboratorService();
  const { mutateAsync: changeAvatar, isLoading } = useChangeAvatarMutation();
  const { toast } = useToast();

  const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const files = target.files as FileList;
    const file = files[0];
    if (!file) {
      toast({
        title: 'Nenhuma foto selecionada!',
        variant: 'destructive'
      });
      return;
    }
    const form = new FormData();
    form.append('file', file);
    try {
      await changeAvatar({ form, collaborator_id: user?.user_id });
    } catch (error) {
      toast({
        title: 'Não foi possível trocar a foto de perfil',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="lg:w-[16px] lg:h-[16px] xl:w-[22px] xl:h-[22px] hover:bg-blue-300 bg-slate-300 rounded-full absolute bottom-0 right-0 border-2 border-white">
      <div className="w-full h-full rounded-full flex justify-center items-center">
        <Label htmlFor="picture">
          {isLoading ? (
            <Loader2 className="lg:w-[10px] lg:h-[10px] xl:w-[14px] xl:h-[14px] animate-spin" />
          ) : (
            <RefreshCw className="lg:w-[10px] lg:h-[10px] xl:w-[14px] xl:h-[14px] cursor-pointer" />
          )}
        </Label>
        <Input
          onChange={onInputChange}
          accept=" .jpg, .jpeg, .png"
          id="picture"
          type="file"
          className="hidden"
        />
      </div>
    </div>
  );
};
