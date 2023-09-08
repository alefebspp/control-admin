import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LinkComponentProps } from './types';

const LinkComponent: React.FC<LinkComponentProps> = ({
  href,
  label,
  children,
  className
}) => {
  const pathname = usePathname();

  const isActive = pathname.includes(href);

  return (
    <Link
      className={cn(
        'inline-flex w-full p-2 items-center justify-start gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground bg-slate-300 hover:bg-blue-500 hover:text-white',
        className,
        isActive && 'bg-blue-500 text-white'
      )}
      href={href}
    >
      {children}
      <p className="lg:text-xs xl:text-sm">{label}</p>
    </Link>
  );
};

export default LinkComponent;
