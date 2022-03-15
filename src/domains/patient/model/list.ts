import {
  forward,
  createEvent,
  createStore,
  createEffect,
} from 'effector';
import { debounce } from 'patronum/debounce';
import { wsClient } from 'shared/api';
import { Patient } from '../types';

const PATIENT_LIST_METHOD = '/patient/list';

export const fetchPatients = createEvent();
export const searchPatients = createEvent<string>();
export const patientsChanged = createEvent<Patient[]>();

export const $patients = createStore<Patient[]>([]).on(
  patientsChanged,
  (_, patients) => patients
);

const fetchPatientsFx = createEffect((fullName?: string) => {
  wsClient.send({
    status: 'ok',
    method: PATIENT_LIST_METHOD,
    payload: { fullName },
  });
});

forward({
  from: fetchPatients,
  to: fetchPatientsFx,
});

forward({
  from: debounce({ source: searchPatients, timeout: 200 }),
  to: fetchPatientsFx,
});

wsClient.on<Patient[]>(PATIENT_LIST_METHOD, (message) => {
  if (message.status === 'ok' && message.payload) {
    patientsChanged(message.payload);
  }
  // TODO напилить ошибки
});
