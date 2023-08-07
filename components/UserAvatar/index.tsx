import { UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export interface AvatarProps {
  source?: string | null;
  className?: string;
}

export const UserAvatar = ({ source, className }: AvatarProps) => {
  return source ? (
    <Avatar className={className}>
      <AvatarImage src={source} />
      <AvatarFallback>
        <Skeleton className={className} />
      </AvatarFallback>
    </Avatar>
  ) : (
    <UserCircle className={className} />
  );
};
