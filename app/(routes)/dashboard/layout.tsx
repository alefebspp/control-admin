import NavBarContainer from '@/layout/NavBarContainer';

export default function DashboardLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <NavBarContainer>{children}</NavBarContainer>;
}
