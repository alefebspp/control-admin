import dynamic from 'next/dynamic';
import { LucideProps, dynamicIconImports } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
  route?: string;
}

const Icon = ({ name, fill, route, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);

  const pathname = usePathname();

  const isActive = pathname == route;

  return <LucideIcon strokeWidth={1.5} {...props} />;
};

export default Icon;
