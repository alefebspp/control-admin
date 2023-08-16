export interface Collaborator {
  avatar: string;
  email: string;
  id: string;
  interval_end: string;
  interval_start: string;
  name: string;
  shift_end: string;
  shift_start: string;
  surname: string;
  manager?: boolean;
  company_id?: string;
}

export interface RegistryCollaborator
  extends Omit<Collaborator, 'id' | 'avatar'> {
  password: string;
}

export interface CreateCollaboratorParams {
  name: string;
  surname: string;
  email: string;
  password: string;
  shift_start: string;
  interval_start: string;
  interval_end: string;
  shift_end: string;
  company_id?: string;
  admin?: boolean;
}

export interface UpdateCollaboratorParams {
  id: string;
  name?: string;
  surname?: string;
  email?: string;
  shift_start?: string;
  interval_start?: string;
  interval_end?: string;
  shift_end?: string;
}

export interface ChangeAvatarParams {
  form: FormData;
  collaborator_id?: string;
}
