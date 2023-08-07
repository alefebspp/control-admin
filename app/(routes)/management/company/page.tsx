'use client';
import { useAuthContext } from '@/context/AuthContext';

const Company = () => {
  const { user } = useAuthContext();

  console.log('USER COMPANY:', user?.user_company);

  return <div>Test</div>;
};

export default Company;
