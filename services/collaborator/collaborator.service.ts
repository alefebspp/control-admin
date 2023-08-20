import { api } from '../api';
import {
  CreateCollaboratorParams,
  UpdateCollaboratorParams,
  Collaborator,
  ChangeAvatarParams
} from './interface';

const createCollaborator = async (params: CreateCollaboratorParams) => {
  try {
    const { data } = await api.post('collaborator/create', params);

    return data;
  } catch (error) {
    throw error;
  }
};

const updateCollaborator = async (params: UpdateCollaboratorParams) => {
  try {
    const { id } = params;
    const { data } = await api.patch(`collaborator/update/${id}`, {
      ...params
    });

    return data;
  } catch (error) {
    throw error;
  }
};

const listCollaborators = async (
  company_id?: string
): Promise<Collaborator[]> => {
  try {
    const { data } = await api.get(`collaborator/list?companyId=${company_id}`);

    return data;
  } catch (error) {
    throw error;
  }
};

const findCollaborator = async (collaborator_id?: string) => {
  try {
    const { data } = await api.get<Collaborator>(
      `collaborator/find/${collaborator_id}`
    );

    return data;
  } catch (error) {
    throw error;
  }
};

const deleteCollaborator = async (collaborator_id?: string) => {
  try {
    const { data } = await api.delete<{ message: string }>(
      `collaborator/delete/${collaborator_id}`
    );

    return data;
  } catch (error) {
    throw error;
  }
};

const changeCollaboratorAvatar = async ({
  form,
  collaborator_id
}: ChangeAvatarParams) => {
  const { data } = await api.patch(
    `collaborator/avatar/${collaborator_id}`,
    form,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );

  return data;
};

export {
  createCollaborator,
  listCollaborators,
  findCollaborator,
  deleteCollaborator,
  updateCollaborator,
  changeCollaboratorAvatar
};
