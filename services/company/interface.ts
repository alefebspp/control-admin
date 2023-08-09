export interface Company {
  id?: string;
  name: string;
  email: string;
  logo?: string;
}

export interface UpdateCompanyParams {
  body: {
    name: string;
    email: string;
    logo?: string;
  };
  company_id: string;
}
