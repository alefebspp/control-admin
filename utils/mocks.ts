import { Adjustment } from '@/services/adjustment/interface';
import { Collaborator } from '@/services/collaborator/interface';
import { Registry } from '@/services/registry/interface';

const collaboratorMock: Collaborator = {
  avatar: '',
  email: 'example@hotmail.com',
  id: '1',
  interval_end: '13:00',
  interval_start: '12:00',
  name: 'Collaborator',
  shift_end: '18:00',
  shift_start: '08:00',
  surname: 'New'
};

const registryMock: Registry = {
  id: '1',
  date: new Date(),
  start: '08:00',
  start_location: 'Start',
  interval_start: '12:00',
  interval_start_location: 'Interval start',
  interval_end: '13:00',
  interval_end_location: 'Interval end',
  end: '18:00',
  end_location: 'End location',
  collaborator_id: '1',
  company_id: '1',
  collaborator: collaboratorMock
};

export const adjustmentMock: Adjustment = {
  id: '1',
  registry_id: '1',
  collaborator_id: '1',
  company_id: '1',
  status: 'PENDING',
  reason: 'Default',
  registry_type: 'start',
  new_value: '18:00',
  previous_value: '17:00',
  registry_location: 'Rua bla bla bla bla bla',
  new_location: 'Rua nova bla bla bla bla',
  registry: registryMock,
  collaborator: collaboratorMock
};
