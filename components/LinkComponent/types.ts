export interface LinkComponentProps {
  href: string;
  label?: string;
  children?: React.ReactNode;
  className?: string;
  nestedRoute?: boolean;
}
